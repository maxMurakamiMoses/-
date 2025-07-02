import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsAndConditions() {
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
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">利用規約</h1>
              <p className="text-gray-400 text-base sm:text-lg">
                最終更新日: {new Date().toLocaleDateString("ja-JP")}
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">1. 利用条件の承諾</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                オナサムライ（以下「本アプリ」）へのアクセスおよび利用により、本利用規約に同意し、
                その条件に従うことを承諾したものとみなされます。
              </p>
              <p className="text-gray-300">
                同意いただけない場合は、本サービスのご利用をお控えください。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">2. 利用許諾</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                本アプリを個人的かつ非営利目的の一時的な閲覧のために、1台の端末にダウンロードすることを許諾します。
              </p>
              <p className="text-gray-300 mb-2 sm:mb-4">
                これは権利の譲渡ではなく、以下の行為を禁止するライセンスの付与となります。
              </p>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-4 text-gray-300">
                <li>素材の改変や複製</li>
                <li>商業目的での利用</li>
                <li>ソフトウェアのリバースエンジニアリングの試み</li>
                <li>著作権その他の表示の削除</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">3. 免責事項</h2>
              <p className="text-gray-300">
                本アプリの内容は「現状のまま」提供されており、明示または黙示の保証を一切行いません。
                商品性、特定目的適合性、知的財産権非侵害についての保証を含みますが、これに限りません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">4. 責任の制限</h2>
              <p className="text-gray-300">
                本アプリまたはその提供者は、本アプリの利用や利用不能に起因する損害（データ損失や利益損失、業務中断などを含むがこれに限らない）について、一切責任を負いません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">5. 情報の正確性</h2>
              <p className="text-gray-300">
                本アプリ内の情報には、技術的、誤字脱字、写真などの誤りが含まれる場合があります。
                情報の正確性、完全性、最新性について保証いたしません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">6. リンクについて</h2>
              <p className="text-gray-300">
                本アプリに掲載されているリンク先の内容については、本アプリがすべてを確認しているわけではなく、責任を負いかねます。
                リンクの掲載は、本アプリによる推薦を意味するものではありません。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">7. 規約の変更</h2>
              <p className="text-gray-300">
                本アプリは、利用規約を予告なく変更することがあります。
                変更後も本アプリを利用することで、最新の利用規約に同意したものとみなされます。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">8. 準拠法</h2>
              <p className="text-gray-300">
                本規約は日本法に準拠し解釈されます。
                また、本規約に関する紛争は日本の裁判所の専属的管轄とします。
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">9. お問い合わせ先</h2>
              <p className="text-gray-300 mb-2 sm:mb-4">
                利用規約に関するご質問は、以下の連絡先までお願いいたします。
              </p>
              <p className="font-semibold text-gray-300 break-all">support@オナサムライ.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 オナサムライ. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
