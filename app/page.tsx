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
import CommunityDiscussion from "./components/CommunityDiscussion";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection />

      {/* Main Content with Sidebar */}
      <div className="max-w-[1920px] mx-auto px-[420px] py-16">
        <div className="flex gap-12">
          {/* Left Content */}
          <div className="flex-1">
            <PopularPosts />
            <ExpertQuestions />
          </div>

          {/* Right Sidebar */}
          <div className="w-[437px] flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      <ArticlesSection />

      <MembershipSection />

      <BannerSection />

      <ExpertLectures />

      <ExpertConsultation />

      <CommunityDiscussion />

      <Footer />
    </div>
  );
}
