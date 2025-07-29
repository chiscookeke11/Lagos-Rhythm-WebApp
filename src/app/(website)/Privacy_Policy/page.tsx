export default function Page() {
    return (
        <main className="w-full  px-4 py-8  pt-28 md:px-6 lg:px-8  bg-[#05073C]/95 text-[#FDF4F1] font-signika ">
            <h1 className="text-4xl font-bold text-center mb-4 font-merriweather ">Privacy Policy</h1>
            <p className="text-center text-base text-muted-foreground mb-8">
                Effective Date: [01-08-2025] | Last Updated: [01-08-2025]
            </p>

            <section className="space-y-6 text-lg leading-relaxed">
                <p>
                    Welcome to Lagos Rhythm. Your privacy matters to us. This Privacy Policy explains how we collect, use, and
                    protect your personal information when you use our website, book tours, or interact with our livestream
                    content.
                </p>

                <h2 className="text-2xl font-semibold pt-4">1. Information We Collect</h2>
                <p>When you interact with Lagos Rhythm, we may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Personal details:</strong> Full name, email address, race, and country
                    </li>
                    <li>
                        <strong>Booking data:</strong> Tour preferences, chosen dates, referral source
                    </li>
                    <li>
                        <strong>Device & usage data:</strong> IP address, browser type, device information
                    </li>
                    <li>
                        <strong>Payment info:</strong> When applicable, processed securely through third-party gateways (we do not
                        store card or wallet details)
                    </li>
                    <li>
                        <strong>KYC/AML data:</strong> For certain transactions, we may request additional identification to comply
                        with anti-money laundering regulations
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold pt-4">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Manage bookings and provide access to livestreamed or in-person tours</li>
                    <li>Communicate updates, confirmations, and reminders</li>
                    <li>Customize user experience and suggest relevant content</li>
                    <li>Comply with legal requirements, including KYC and AML protocols</li>
                    <li>Improve our platform and services through aggregated insights</li>
                </ul>
                <p>We will never sell or rent your personal data to third parties.</p>

                <h2 className="text-2xl font-semibold pt-4">3. Sharing with Third Parties</h2>
                <p>
                    We may share limited information with trusted partners only when necessary to operate our services. This
                    includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processors</li>
                    <li>Email platforms</li>
                    <li>Livestream tools</li>
                    <li>Identity verification providers (KYC/AML compliance)</li>
                </ul>
                <p>Each third-party provider operates under its own privacy policy and security practices.</p>

                <h2 className="text-2xl font-semibold pt-4">4. Data Security</h2>
                <p>
                    We use appropriate technical and organizational measures to protect your information from unauthorized access,
                    alteration, or disclosure. However, no system is 100% secure, and we advise you to also protect your login
                    information.
                </p>

                <h2 className="text-2xl font-semibold pt-4">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Request access to your personal data</li>
                    <li>Correct or update inaccurate information</li>
                    <li>Withdraw consent or unsubscribe at any time</li>
                    <li>Request deletion of your data, where applicable</li>
                </ul>
                <p>
                    To make any of these requests, please email us at:{" "}
                    <a href="mailto:info@lagosrhythm.com" className="text-primary underline">
                        info@lagosrhythm.com
                    </a>
                </p>

                <h2 className="text-2xl font-semibold pt-4">6. Cookies & Tracking</h2>
                <p>
                    We may use cookies and analytics tools to improve your browsing experience and understand how visitors use our
                    site. You can control cookies through your browser settings.
                </p>

                <h2 className="text-2xl font-semibold pt-4">7. KYC & AML Compliance</h2>
                <p>
                    For certain transactions, Lagos Rhythm may collect additional documentation to verify identity, in line with
                    Anti-Money Laundering (AML) laws. This data is collected securely and only when required by law or our payment
                    partners.
                </p>

                <h2 className="text-2xl font-semibold pt-4">8. International Users</h2>
                <p>
                    If you&apos;re accessing Lagos Rhythm from outside Nigeria, please note that your data may be processed in
                    jurisdictions that may not offer the same level of privacy protection as your home country.
                </p>

                <h2 className="text-2xl font-semibold pt-4">9. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. When we do, we&apos;ll revise the &ldquo;Last
                    Updated&rdquo; date and notify registered users where appropriate.
                </p>

                <h2 className="text-2xl font-semibold pt-4">10. Contact Us</h2>
                <p>
                    For questions or concerns about this Privacy Policy, reach out to:{" "}
                    <a href="mailto:info@lagosrhythm.com" className="text-[#EF8F57] underline">
                        info@lagosrhythm.com
                    </a>
                </p>
            </section>
        </main>
    )
}
