import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void,
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Organize Your Life with{' '}
          <span className="text-primary dark:text-indigo-600">TaskMaster</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The modern way to manage your tasks. Simple, secure, and beautifully designed to help you stay productive.
        </p>
        <Button
          onClick={onGetStarted}
          size="lg"
          className="text-lg px-8 py-6 shadow-lg hover:shadow-xl"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  );
};
export default Hero;