import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-full sm:max-w-4xl">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg">
            ← ホームに戻る
          </Link>
        </div>

        {/* Content */}
        <Card className="bg-gray-900/50 border-gray-700 w-full">
          <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Header inside card */}
            <div className="text-left">
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">プライバシーポリシー</h1>
              <p className="text-gray-400 text-base sm:text-lg">
                最終更新日: {new Date().toLocaleDateString("ja-JP")}
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">1. 収集する情報について</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                サポートへのお問い合わせの際に、お客様から直接提供された情報を収集します。それ以外の情報は収集しません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">2. 情報の利用目的</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">収集した情報は以下の目的で使用します。</p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-4 text-gray-300">
                <li>サービスの提供および維持</li>
                <li>ユーザー体験のパーソナライズ</li>
                <li>重要なお知らせや通知の送信</li>
                <li>アプリやサービスの改善</li>
                <li>カスタマーサポートの提供</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">3. 情報の共有について</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                お客様の同意なしに、個人情報を第三者に販売、取引、または譲渡することはありません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">4. データの安全管理</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                お客様の個人情報はセキュリティ特化したデータベースを使うなどの適切な安全対策を実施しています。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">5. お客様の権利</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">お客様には以下の権利があります。</p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-4 text-gray-300">
                <li>ご自身の個人情報へのアクセス</li>
                <li>誤った情報の訂正</li>
                <li>データの削除請求</li>
                <li>マーケティングコミュニケーションの停止</li>
                <li>データのエクスポート</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">6. お問い合わせ</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                本プライバシーポリシーに関するご質問は、以下までご連絡ください。
              </p>
              <p className="font-semibold text-gray-300 break-all">support@オナサムライ.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 オナサムライ. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
