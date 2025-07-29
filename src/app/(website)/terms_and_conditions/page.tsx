export default function Page() {
    return (
        <main className="w-full  px-4 py-8  pt-28 md:px-6 lg:px-8  bg-[#05073C]/95 text-[#FDF4F1] font-signika">
            <h1 className="text-4xl font-bold text-center mb-4 font-merriweather ">Terms & Conditions</h1>
            <p className="text-center text-base text-muted-foreground mb-8">
                Effective Date: 01-08-25 | Last Updated: 01-08-25
            </p>

            <section className="space-y-6 text-lg leading-relaxed">
                <p>
                    Welcome to Lagos Rhythm. By using our website, registering for a tour, or participating in any of our
                    services, you agree to the terms outlined below. Please read them carefully.
                </p>
                <p>If you do not agree with these terms, kindly refrain from using our services.</p>

                <h2 className="text-2xl font-semibold pt-4">1. Use of Our Services</h2>
                <p>
                    Lagos Rhythm offers live virtual tours (E-Rhythm), curated onsite travel experiences (coming soon), and
                    cultural storytelling rooted in Lagos, Nigeria. All services are for entertainment, cultural, and educational
                    purposes.
                </p>

                <h2 className="text-2xl font-semibold pt-4">2. Age Eligibility</h2>
                <p>Our services are available to users aged 13 and above:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Users 13–17 years old may register for Free E-Rhythm without parental consent.</li>
                    <li>
                        For any paid experiences or bookings, users under 18 must have parental or guardian permission to
                        participate.
                    </li>
                </ul>
                <p>
                    By using Lagos Rhythm, you confirm that you meet the age requirement or have received the required consent.
                </p>

                <h2 className="text-2xl font-semibold pt-4">3. Booking & Registration</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Free E-Rhythm requires a short registration form; access codes are delivered via email.</li>
                    <li>Exclusive E-Rhythm (paid) requires full booking and payment confirmation.</li>
                    <li>All user-provided information must be accurate at the time of submission.</li>
                </ul>
                <p>Lagos Rhythm reserves the right to cancel bookings if terms are violated.</p>

                <h2 className="text-2xl font-semibold pt-4">4. Access Codes & Livestream Use</h2>
                <p>Access to live experiences is granted via secure codes. These are:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Unique to each user</li>
                    <li>Not transferable</li>
                    <li>Not to be shared or published elsewhere</li>
                </ul>
                <p>Unauthorized sharing may result in denied access or account removal.</p>

                <h2 className="text-2xl font-semibold pt-4">5. Content Ownership</h2>
                <p>
                    All content including videos, livestreams, graphics, text, and guided experiences is the intellectual property
                    of Lagos Rhythm or its partners.
                </p>
                <p>
                    You may not copy, record, distribute, or reuse any part of our content without express written permission.
                </p>

                <h2 className="text-2xl font-semibold pt-4">6. Refund & Cancellation Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Free E-Rhythm bookings require no payment and can be canceled at any time.</li>
                    <li>Exclusive bookings can be canceled or rescheduled with at least 48 hours’ notice.</li>
                    <li>
                        Refund requests should be sent to{" "}
                        <a href="mailto:bookings@lagosrhythm.com" className="text-[#EF8F57] underline">
                            bookings@lagosrhythm.com
                        </a>{" "}
                        and will be reviewed within 5 working days.
                    </li>
                </ul>
                <p>We do not guarantee refunds for missed sessions without prior notice.</p>

                <h2 className="text-2xl font-semibold pt-4">7. User Conduct</h2>
                <p>All users are expected to engage respectfully. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Disrupt live sessions</li>
                    <li>Use abusive or discriminatory language</li>
                    <li>Violate the privacy of other participants</li>
                    <li>Record or redistribute any part of the tour without consent</li>
                </ul>
                <p>Violation may result in account restriction or permanent ban.</p>

                <h2 className="text-2xl font-semibold pt-4">8. KYC & AML Compliance</h2>
                <p>
                    Lagos Rhythm may request additional documentation for certain transactions or partnerships to comply with Know
                    Your Customer (KYC) and Anti-Money Laundering (AML) regulations.
                </p>
                <p>All identity verification data is stored securely and only when legally necessary.</p>

                <h2 className="text-2xl font-semibold pt-4">9. Third-Party Services</h2>
                <p>We use third-party platforms for:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processing</li>
                    <li>Video streaming</li>
                    <li>Email communication and newsletters</li>
                </ul>
                <p>Your interactions with these services are also subject to their own policies.</p>

                <h2 className="text-2xl font-semibold pt-4">10. Limitation of Liability</h2>
                <p>Lagos Rhythm is not liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>User-side technical issues (e.g., poor internet, device incompatibility)</li>
                    <li>Interruptions caused by third-party platforms</li>
                    <li>Delays or cancellations due to unforeseen circumstances</li>
                </ul>
                <p>
                    All experiences are offered &quot;as is.&quot; While we strive to provide seamless service, we cannot
                    guarantee perfection.
                </p>

                <h2 className="text-2xl font-semibold pt-4">11. Modifications</h2>
                <p>
                    We reserve the right to modify these Terms at any time. Updates will be reflected on this page with a revised
                    &quot;Last Updated&quot; date.
                </p>
                <p>Your continued use of Lagos Rhythm after changes are posted implies acceptance of the new terms.</p>

                <h2 className="text-2xl font-semibold pt-4">12. Governing Law</h2>
                <p>
                    These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be handled under
                    Nigerian jurisdiction.
                </p>

                <h2 className="text-2xl font-semibold pt-4">13. Contact Us</h2>
                <p>
                    For any questions or legal concerns:{" "}
                    <a href="mailto:info@lagosrhythm.com" className="text-[#EF8F57] underline">
                        info@lagosrhythm.com
                    </a>
                </p>
            </section>
        </main>
    )
}
