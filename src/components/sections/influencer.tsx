import Image from "next/image";

export function Influencer() {
  return (
    <section className="py-14 bg-purple-900 dark:bg-purple-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className=" mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
          Vouched by your favourite influencers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-purple-800 dark:bg-purple-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-700">
            <div className="flex items-center space-x-5 mb-6">
              <Image
                src="/profilepic.jpg"
                alt="Influencer 1"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Sarah Johnson
                </h3>
                <p className="text-base text-purple-200 mb-1">
                  Lifestyle & Tech
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-purple-300 font-medium">
                    2.1M followers
                  </p>
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-purple-100 text-base leading-relaxed">
              &quot;The interface is intuitive and the features are exactly what I needed!&quot;
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-purple-800 dark:bg-purple-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-700">
            <div className="flex items-center space-x-5 mb-6">
              <Image
                src="/profilepic.jpg"
                alt="Influencer 2"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Mike Chen
                </h3>
                <p className="text-base text-purple-200 mb-1">
                  Productivity Expert
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-purple-300 font-medium">
                    890K followers
                  </p>
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-purple-100 text-base leading-relaxed">
              &quot;This stands out for its simplicity and effectiveness. Highly recommend!&quot;
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-purple-800 dark:bg-purple-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-700">
            <div className="flex items-center space-x-5 mb-6">
              <Image
                src="/profilepic.jpg"
                alt="Influencer 3"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Emma Rodriguez
                </h3>
                <p className="text-base text-purple-200 mb-1">
                  Digital Creator
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-purple-300 font-medium">
                    1.5M followers
                  </p>
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-purple-100 text-base leading-relaxed">
              &quot;I&apos;ve tried countless apps, but this one actually helps me stay organized.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
