import { Shield, CheckSquare, Smartphone } from 'lucide-react';
import Description from './description';
import Title from './title';

const Features = () => {
    const features = [
        {
            icon: Shield,
            title: 'Secure Authentication',
            description: 'JWT-based authentication with encrypted passwords for maximum security',
            color: 'bg-primary',
        },
        {
            icon: CheckSquare,
            title: 'Smart Task Management',
            description: 'Create, organize, and track your tasks with intelligent filtering and sorting',
            color: 'bg-green-500',
        },
        {
            icon: Smartphone,
            title: 'Responsive Design',
            description: 'Access your tasks anywhere with our fully responsive mobile-first design',
            color: 'bg-yellow-500',
        },
    ];

    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4">
                        <Title>Everything you need to stay organized</Title>
                    </h3>
                    <p className=" max-w-2xl mx-auto">
                        <Description>Built with modern technology and designed for productivity</Description>
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="text-center p-6">
                                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-white dark:text-black`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">
                                    <Title>{feature.title}</Title>
                                </h4>
                                <p className="text-">
                                    <Description>{feature.description}</Description>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
