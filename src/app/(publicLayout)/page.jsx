import Banner from '@/components/home/Banner';
import FeaturedClasses from '@/components/home/FeaturedClasses';
import LatestForumPosts from '@/components/home/LatestForumPosts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturedClasses />
      <LatestForumPosts />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}