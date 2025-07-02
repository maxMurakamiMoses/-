import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Content */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-8 space-y-8">
            {/* Header inside card */}
            <div className="text-left">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-gray-400 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account,
                use our services, or contact us for support.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                <li>Account information (email, username, password)</li>
                <li>Usage data and app interactions</li>
                <li>Device information and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience</li>
                <li>Send important updates and notifications</li>
                <li>Improve our app and services</li>
                <li>Provide customer support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties
                without your consent, except as described in this policy.
              </p>
              <p className="text-gray-300">
                We may share information with service providers who assist us in operating our app,
                conducting business, or serving users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-gray-300">
                However, no method of transmission over the internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-gray-300 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="font-semibold text-gray-300">support@オナサムライ.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400">
            © 2024 オナサムライ. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 