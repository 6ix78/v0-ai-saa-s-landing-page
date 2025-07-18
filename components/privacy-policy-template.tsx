import Link from "next/link"

export function PrivacyPolicyTemplate() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <article className="prose prose-gray max-w-none dark:prose-invert">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy for PulseCloud</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Last updated: July 13, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to PulseCloud. We are committed to protecting your privacy and handling your data in an open and
            transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website{" "}
            <Link href="https://pulsecloud.com" className="text-primary hover:underline">
              https://pulsecloud.com
            </Link>{" "}
            (the "Site") and use our services. Please read this policy carefully. If you do not agree with the terms of
            this privacy policy, please do not access the Site or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site
            includes:
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
            give to us when you register with the Site or when you choose to participate in various activities related
            to the Site, such as online chat and message boards.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before and
            after accessing the Site.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services from the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Create and manage your account.</li>
            <li>
              Process your transactions and send you related information, including purchase confirmations and invoices.
            </li>
            <li>Enable user-to-user communications.</li>
            <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
            <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, or safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with
            third parties for marketing purposes, as permitted by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware
            of any data we have collected from children under age 13, please contact us using the contact information
            provided below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
            "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you
            to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">
            Email:{" "}
            <Link href="mailto:privacy@pulsecloud.com" className="text-primary hover:underline">
              privacy@pulsecloud.com
            </Link>
          </p>
        </section>
      </article>
    </div>
  )
}
