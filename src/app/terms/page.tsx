import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsAndConditions() {
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
              <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
              <p className="text-gray-400 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing and using クイッター ("the App"), you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
              <p className="text-gray-300">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of the app for personal,
                non-commercial transitory viewing only.
              </p>
              <p className="text-gray-300 mb-4">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software contained in the app</li>
                <li>Remove any copyright or other proprietary notations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-gray-300">
                The materials within クイッター are provided on an 'as is' basis. We make no
                warranties, expressed or implied, and hereby disclaim and negate all other warranties
                including without limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-gray-300">
                In no event shall クイッター or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the app.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-300">
                The materials appearing in クイッター could include technical, typographical, or
                photographic errors. We do not warrant that any of the materials on the app are
                accurate, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-gray-300">
                クイッター has not reviewed all of the sites linked to its app and is not responsible
                for the contents of any such linked site. The inclusion of any link does not imply
                endorsement by クイッター of the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-gray-300">
                クイッター may revise these terms of service for its app at any time without notice.
                By using this app you are agreeing to be bound by the then current version of these
                Terms and Conditions of Use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-gray-300">
                These terms and conditions are governed by and construed in accordance with the laws
                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms & Conditions, please contact us at:
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