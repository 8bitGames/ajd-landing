import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PopularPosts from "./components/PopularPosts";
import ExpertQuestions from "./components/ExpertQuestions";
import Sidebar from "./components/Sidebar";
import ArticlesSection from "./components/ArticlesSection";
import MembershipSection from "./components/MembershipSection";
import BannerSection from "./components/BannerSection";
import ExpertLectures from "./components/ExpertLectures";
import ExpertConsultation from "./components/ExpertConsultation";
import AppBannerSection from "./components/AppBannerSection";
import CommunityDiscussion from "./components/CommunityDiscussion";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection />

      {/* Main Content with Sidebar */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[420px] py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 w-full lg:w-auto">
            <PopularPosts />
            <ExpertQuestions />
          </div>

          {/* Right Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block lg:w-[340px] xl:w-[400px] 2xl:w-[437px] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      <ArticlesSection />

      <MembershipSection />

      <BannerSection />

      <ExpertLectures />

      <ExpertConsultation />

      <AppBannerSection />

      <CommunityDiscussion />

      <Footer />
    </div>
  );
}
