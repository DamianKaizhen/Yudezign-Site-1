import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - YuDezign Custom Cabinets"
        description="YuDezign's privacy policy. Learn how we collect, use, and protect your personal information when you use our custom cabinet services in Houston, Texas."
        keywords="privacy policy, data protection, yudezign privacy, cabinet privacy policy"
        url="https://www.yudezign.com/privacy"
      />
      <div className="min-h-screen pt-24 bg-luxury-cream">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-luxury-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h1 className="text-display-mobile md:text-display font-medium text-luxury-gray-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-body-lg text-luxury-gray-600 mb-4">
                Last Updated: December 23, 2024
              </p>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                At YuDezign ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (https://www.yudezign.com) or use our custom cabinet services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4 bg-luxury-white">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">1. Information We Collect</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Personal Information</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                When you contact us or request a quote, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Project details (measurements, design preferences, installation location)</li>
                <li>Communication preferences</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address and general location information</li>
                <li>Pages viewed and time spent on our website</li>
                <li>Referring website or source</li>
              </ul>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Provide custom cabinet design and manufacturing services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you quotes, project updates, and delivery information</li>
                <li>Process payments and fulfill orders</li>
                <li>Improve our website and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist with payment processing, email communication, website hosting, and analytics (e.g., Vercel, payment processors)</li>
                <li><strong>Contractors and Installers:</strong> If you request installation services, we may share relevant project details with trusted installers in the Houston area</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of our business assets</li>
              </ul>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance and functionality</li>
                <li>Provide analytics through Vercel Analytics and Speed Insights</li>
              </ul>
              <p className="text-body text-luxury-gray-600 leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">5. Data Security</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Secure data transmission using SSL/TLS encryption</li>
                <li>Secure storage of customer data</li>
                <li>Limited access to personal information by authorized personnel only</li>
                <li>Regular security assessments</li>
              </ul>
              <p className="text-body text-luxury-gray-600 leading-relaxed mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
              </ul>
              <p className="text-body text-luxury-gray-600 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:damian.k@yudezign.com" className="text-primary hover:text-primary-light font-medium">damian.k@yudezign.com</a> or call <a href="tel:+17135020399" className="text-primary hover:text-primary-light font-medium">(713) 502-0399</a>.
              </p>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Our website may contain links to third-party websites or services that are not owned or controlled by YuDezign. We are not responsible for the privacy practices of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information.
              </p>
            </motion.div>

            {/* Section 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">9. California Privacy Rights</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>
            </motion.div>

            {/* Section 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </motion.div>

            {/* Section 11 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-luxury-cream rounded-lg p-6 border border-luxury-sand">
                <p className="text-body text-luxury-gray-900 font-medium mb-2">YuDezign Custom Cabinets</p>
                <p className="text-body text-luxury-gray-600">13366 Murphy Rd</p>
                <p className="text-body text-luxury-gray-600">Stafford, TX 77477</p>
                <p className="text-body text-luxury-gray-600 mt-3">
                  Email: <a href="mailto:damian.k@yudezign.com" className="text-primary hover:text-primary-light font-medium">damian.k@yudezign.com</a>
                </p>
                <p className="text-body text-luxury-gray-600">
                  Phone: <a href="tel:+17135020399" className="text-primary hover:text-primary-light font-medium">(713) 502-0399</a>
                </p>
                <p className="text-body text-luxury-gray-600 mt-3">
                  Business Hours: Monday-Friday, 9:00 AM - 5:30 PM
                </p>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;