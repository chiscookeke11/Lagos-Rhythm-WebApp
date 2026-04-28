"use client";

import { useEffect, useMemo, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";

interface RouteCommunityChatProps {
  routeKey?: string;
  from: string;
  to: string;
}

interface RouteChatMessage {
  id: string;
  message: string;
  senderName: string;
  senderId?: string;
  createdAtMillis?: number;
}

const MAX_MESSAGE_LENGTH = 280;
const MIN_POST_INTERVAL_MS = 10_000;
const DUPLICATE_WINDOW_MS = 120_000;
const MAX_URLS_PER_MESSAGE = 2;
const REPORT_REASONS = ["spam", "abuse", "misleading-traffic-info", "other"] as const;

function formatTime(timestamp?: number) {
  if (!timestamp) return "Just now";
  return new Date(timestamp).toLocaleString();
}

function normalizeRouteKey(routeKey: string) {
  return routeKey.trim().toLowerCase().replace(/\s+/g, "-");
}

function normalizeMessageValue(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function countUrls(value: string) {
  const urlMatches = value.match(/https?:\/\//gi);
  return urlMatches?.length ?? 0;
}

export default function RouteCommunityChat({ routeKey, from, to }: RouteCommunityChatProps) {
  const { user } = useUser();

  const resolvedRouteKey = useMemo(() => {
    const raw = routeKey?.trim() || `${from}-${to}`;
    return normalizeRouteKey(raw);
  }, [from, routeKey, to]);

  const [messages, setMessages] = useState<RouteChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openReportForMessageId, setOpenReportForMessageId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<(typeof REPORT_REASONS)[number]>("spam");
  const [isReporting, setIsReporting] = useState(false);
  const [reportFeedback, setReportFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedRouteKey) return;

    const messagesRef = collection(fireDB, "street_rhythm_route_chat", resolvedRouteKey, "messages");
    const messageQuery = query(messagesRef, orderBy("createdAt", "desc"), limit(50));

    const unsubscribe = onSnapshot(
      messageQuery,
      (snapshot) => {
        const nextMessages: RouteChatMessage[] = snapshot.docs.map((doc) => {
          const data = doc.data() as {
            message?: string;
            senderName?: string;
            senderId?: string;
            createdAt?: { toMillis?: () => number };
          };

          return {
            id: doc.id,
            message: data.message ?? "",
            senderName: data.senderName ?? "Anonymous",
            senderId: data.senderId,
            createdAtMillis: data.createdAt?.toMillis?.(),
          };
        });

        setMessages(nextMessages);
      },
      (snapshotError) => {
        setError(snapshotError.message || "Unable to load route chat.");
      }
    );

    return () => unsubscribe();
  }, [resolvedRouteKey]);

  const remainingChars = MAX_MESSAGE_LENGTH - message.length;

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Please enter a message before sending.");
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setError(`Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    if (countUrls(trimmedMessage) > MAX_URLS_PER_MESSAGE) {
      setError(`Message can include at most ${MAX_URLS_PER_MESSAGE} links.`);
      return;
    }

    if (!user) {
      setError("Please sign in to post updates.");
      return;
    }

    const senderName =
      user.fullName?.trim() ||
      user.firstName?.trim() ||
      "Anonymous";

    const normalizedMessage = normalizeMessageValue(trimmedMessage);
    const senderIdentity = user.id;

    const duplicateMessage = messages.find((item) => {
      const sameSender = item.senderId === user.id;
      const sameMessage = normalizeMessageValue(item.message) === normalizedMessage;
      const recentlyPosted =
        typeof item.createdAtMillis === "number" && Date.now() - item.createdAtMillis < DUPLICATE_WINDOW_MS;

      return sameSender && sameMessage && recentlyPosted;
    });

    if (duplicateMessage) {
      setError("Duplicate update detected. Please wait before posting the same message again.");
      return;
    }

    if (typeof window !== "undefined") {
      const rateLimitKey = `street-rhythm-chat-last-post:${resolvedRouteKey}:${senderIdentity}`;
      const lastPostRaw = window.localStorage.getItem(rateLimitKey);
      const lastPostTime = lastPostRaw ? Number(lastPostRaw) : 0;

      if (lastPostTime > 0) {
        const elapsed = Date.now() - lastPostTime;
        if (elapsed < MIN_POST_INTERVAL_MS) {
          const waitSeconds = Math.ceil((MIN_POST_INTERVAL_MS - elapsed) / 1000);
          setError(`You're posting too fast. Please wait ${waitSeconds}s and try again.`);
          return;
        }
      }
    }

    try {
      setIsSending(true);
      setError(null);

      await addDoc(collection(fireDB, "street_rhythm_route_chat", resolvedRouteKey, "messages"), {
        routeKey: resolvedRouteKey,
        message: trimmedMessage,
        senderName,
        senderId: user.id,
        createdAt: serverTimestamp(),
      });

      if (typeof window !== "undefined") {
        const rateLimitKey = `street-rhythm-chat-last-post:${resolvedRouteKey}:${senderIdentity}`;
        window.localStorage.setItem(rateLimitKey, String(Date.now()));
      }

      setMessage("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

  const submitReport = async (messageToReport: RouteChatMessage) => {
    if (!user) {
      setError("Please sign in to report a message.");
      return;
    }

    if (messageToReport.senderId && messageToReport.senderId === user.id) {
      setReportFeedback("You cannot report your own message.");
      return;
    }

    try {
      setIsReporting(true);
      setError(null);
      setReportFeedback(null);

      await addDoc(collection(fireDB, "street_rhythm_route_chat_reports"), {
        routeKey: resolvedRouteKey,
        messageId: messageToReport.id,
        messagePreview: messageToReport.message.slice(0, 180),
        reason: reportReason,
        reporterId: user.id,
        reportedSenderId: messageToReport.senderId ?? null,
        createdAt: serverTimestamp(),
      });

      setReportFeedback("Report submitted. Thank you for helping keep this route chat safe.");
      setOpenReportForMessageId(null);
      setReportReason("spam");
    } catch (reportError) {
      setError(reportError instanceof Error ? reportError.message : "Unable to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 space-y-5">
      <div className="space-y-1">
        <h4 className="text-lg font-black text-[#05073C]">Community Chat</h4>
        <p className="text-sm text-gray-600">
          Live commuter updates for this route. Share incidents, heavy traffic points, or route changes.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Active Route Channel</p>
        <p className="text-sm font-semibold text-[#05073C]">{resolvedRouteKey}</p>
      </div>

      <form onSubmit={submitMessage} className="space-y-3">
        {!user && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Sign in to post route updates.
            <span className="ml-2 inline-flex">
              <SignInButton mode="modal">
                <button type="button" className="font-semibold underline">
                  Sign in now
                </button>
              </SignInButton>
            </span>
          </div>
        )}

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Post a live route update..."
          maxLength={MAX_MESSAGE_LENGTH}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none resize-y focus:ring-2 focus:ring-[#05073C]/20"
        />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className={`text-xs ${remainingChars < 30 ? "text-amber-700" : "text-gray-500"}`}>
            {remainingChars} characters left
          </p>
          <button
            type="submit"
            disabled={isSending || !user}
            className="rounded-lg bg-[#05073C] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Post Update"}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {reportFeedback && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {reportFeedback}
        </div>
      )}

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {messages.length < 1 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            No updates yet. Be the first to share a route condition.
          </div>
        )}

        {messages.map((chatMessage) => (
          <article key={chatMessage.id} className="rounded-xl border border-gray-200 bg-white px-4 py-3 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#05073C]">{chatMessage.senderName}</p>
              <p className="text-xs text-gray-500">{formatTime(chatMessage.createdAtMillis)}</p>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line">{chatMessage.message}</p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setReportFeedback(null);
                  setOpenReportForMessageId((current) => (current === chatMessage.id ? null : chatMessage.id));
                }}
                className="text-xs font-semibold text-gray-500 underline hover:text-[#05073C]"
              >
                Report
              </button>
            </div>

            {openReportForMessageId === chatMessage.id && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 space-y-3">
                {!user && (
                  <p className="text-xs text-amber-800">
                    Sign in to report this message.
                  </p>
                )}

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-800">Reason</span>
                  <select
                    value={reportReason}
                    onChange={(event) => setReportReason(event.target.value as (typeof REPORT_REASONS)[number])}
                    className="rounded-md border border-amber-300 bg-white px-2.5 py-2 text-xs"
                  >
                    {REPORT_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </label>

                {user ? (
                  <button
                    type="button"
                    disabled={isReporting}
                    onClick={() => void submitReport(chatMessage)}
                    className="rounded-md bg-[#05073C] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {isReporting ? "Submitting..." : "Submit Report"}
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button type="button" className="rounded-md bg-[#05073C] px-3 py-2 text-xs font-semibold text-white">
                      Sign in to Report
                    </button>
                  </SignInButton>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
