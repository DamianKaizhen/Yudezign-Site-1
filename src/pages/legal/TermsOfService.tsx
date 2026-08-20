import { motion } from 'framer-motion';
import SEO from '../../components/SEO';

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service - YuDezign Custom Cabinets"
        description="YuDezign's terms of service. Read our terms and conditions for custom European frameless cabinet manufacturing and supply services in Houston, Texas."
        keywords="terms of service, terms and conditions, yudezign terms, cabinet terms"
        url="https://www.yudezign.com/terms"
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
                Terms of Service
              </h1>
              <p className="text-body-lg text-luxury-gray-600 mb-4">
                Last Updated: December 23, 2024
              </p>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Welcome to YuDezign. These Terms of Service ("Terms") govern your use of our website (https://www.yudezign.com) and the purchase of our custom European frameless cabinet products and services. By accessing our website or purchasing our products, you agree to be bound by these Terms.
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
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                By using our website or services, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree with any part of these Terms, you may not use our website or services.
              </p>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">2. Our Services</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                YuDezign provides custom European frameless cabinet manufacturing on a supply-only basis. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Custom cabinet design consultation</li>
                <li>Cabinet manufacturing using premium 3/4" plywood materials</li>
                <li>Delivery of cabinets (assembled or flat-pack options)</li>
                <li>Access to KD Lite design software for closet projects</li>
              </ul>
              <p className="text-body text-luxury-gray-600 leading-relaxed mt-4">
                <strong>Important:</strong> We do not provide installation services. You are responsible for arranging installation through your own contractor or installer. We can provide referrals to trusted installers in the Greater Houston area upon request.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">3. Ordering and Quotes</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Quote Process</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>All quotes are provided free of charge and are valid for 30 days from the date of issuance</li>
                <li>Quotes are estimates based on the information you provide and are subject to change if specifications change</li>
                <li>We reserve the right to refuse service or decline any project at our discretion</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Order Acceptance</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Orders are not confirmed until you receive written confirmation from YuDezign</li>
                <li>We reserve the right to reject or cancel any order for any reason, including but not limited to: product availability, errors in pricing or product information, or suspected fraud</li>
                <li>Custom orders require a deposit (typically 50%) before manufacturing begins</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Accuracy of Measurements</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                You are responsible for providing accurate measurements and specifications. YuDezign is not liable for cabinets that do not fit due to incorrect measurements provided by the customer. We strongly recommend professional measurement verification before finalizing your order.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">4. Pricing and Payment</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Pricing</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>All prices are in U.S. Dollars (USD)</li>
                <li>Prices are subject to change without notice, but changes will not affect orders already confirmed</li>
                <li>Quoted prices do not include installation, taxes, or delivery fees unless explicitly stated</li>
                <li>Sales tax will be applied where applicable</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>We accept cash, check, and major credit cards</li>
                <li>Deposit: 50% deposit required before manufacturing begins</li>
                <li>Final Payment: Balance due before delivery or pickup</li>
                <li>Late payments may result in delayed delivery and may incur additional fees</li>
              </ul>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">5. Lead Time and Delivery</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Manufacturing Lead Time</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                Our standard lead time is 2-3 weeks from the date of order confirmation and deposit receipt. Lead times are estimates and may vary based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Project complexity and size</li>
                <li>Material availability</li>
                <li>Current production schedule</li>
                <li>Unforeseen circumstances</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Delivery</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Delivery is available within the Greater Houston area</li>
                <li>Delivery fees vary based on location and order size</li>
                <li>Customers are responsible for receiving and inspecting cabinets upon delivery</li>
                <li>Pickup option available at our Stafford, TX facility</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Delays</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                While we strive to meet estimated delivery dates, we are not liable for delays caused by circumstances beyond our reasonable control, including but not limited to material shortages, equipment failures, or acts of God.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">6. Inspection and Acceptance</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                Upon delivery or pickup, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Inspect all cabinets for damage, defects, or discrepancies</li>
                <li>Report any issues immediately (within 24 hours of receipt)</li>
                <li>Sign the delivery receipt acknowledging receipt and condition</li>
              </ul>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Failure to inspect and report issues within 24 hours may limit your ability to claim damages or defects. Once cabinets are installed, claims for manufacturing defects may not be accepted.
              </p>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">7. Warranty</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Limited Warranty</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                YuDezign warrants that our cabinets are free from manufacturing defects in materials and workmanship for a period of one (1) year from the date of delivery, subject to the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Cabinets must be installed by a qualified professional</li>
                <li>Cabinets must be used for their intended purpose in normal residential or commercial environments</li>
                <li>Warranty does not cover damage caused by improper installation, misuse, abuse, or normal wear and tear</li>
                <li>Warranty does not cover damage from water, excessive moisture, or environmental factors</li>
                <li>Warranty does not cover finish variations due to natural wood grain or material characteristics</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Warranty Remedies</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                Our sole obligation under this warranty is to repair or replace (at our discretion) any defective cabinet or component. We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>Labor costs for removal or reinstallation</li>
                <li>Incidental or consequential damages</li>
                <li>Costs associated with countertop removal or replacement</li>
                <li>Lost time or inconvenience</li>
              </ul>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">8. Cancellations and Returns</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Cancellation Policy</h3>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li><strong>Before Manufacturing:</strong> Orders may be canceled before manufacturing begins with a full refund of deposit, minus a 10% administrative fee</li>
                <li><strong>After Manufacturing Begins:</strong> Once manufacturing has started, orders cannot be canceled. Deposits are non-refundable.</li>
                <li><strong>Customer-Caused Delays:</strong> If manufacturing is delayed due to customer-requested changes or indecision, we reserve the right to cancel the order and retain the deposit</li>
              </ul>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Returns</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Due to the custom nature of our products, we do not accept returns unless the cabinets are defective or do not match the agreed-upon specifications. Return authorization must be obtained within 24 hours of delivery.
              </p>
            </motion.div>

            {/* Section 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>YuDezign's total liability for any claim arising from your purchase shall not exceed the amount you paid for the cabinets</li>
                <li>We are not liable for indirect, incidental, consequential, or punitive damages</li>
                <li>We are not responsible for delays or failures caused by circumstances beyond our reasonable control</li>
                <li>We do not provide installation services and are not liable for any damages or issues arising from installation</li>
              </ul>
            </motion.div>

            {/* Section 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of YuDezign or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission.
              </p>
            </motion.div>

            {/* Section 11 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">11. Use of KD Lite Software</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                We provide access to KD Lite design software for closet projects. By using this software:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-luxury-gray-600 ml-4">
                <li>You agree to use the software only for designing projects with YuDezign</li>
                <li>You acknowledge that the software is provided "as is" without warranty</li>
                <li>You are responsible for the accuracy of designs created using the software</li>
                <li>We reserve the right to revoke access at any time</li>
              </ul>
            </motion.div>

            {/* Section 12 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">12. Privacy</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Your use of our website and services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data collection and use practices.
              </p>
            </motion.div>

            {/* Section 13 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">13. Indemnification</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless YuDezign, its officers, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </motion.div>

            {/* Section 14 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">14. Dispute Resolution</h2>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Governing Law</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                These Terms are governed by the laws of the State of Texas, without regard to its conflict of law principles.
              </p>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Dispute Resolution Process</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                In the event of a dispute:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-body text-luxury-gray-600 ml-4 mb-4">
                <li>Contact us first to attempt informal resolution</li>
                <li>If informal resolution fails, disputes shall be resolved through binding arbitration in Houston, Texas</li>
                <li>You waive your right to participate in class action lawsuits or class-wide arbitration</li>
              </ol>

              <h3 className="text-h3 font-medium text-luxury-gray-900 mt-6 mb-3">Venue</h3>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                Any legal action related to these Terms must be brought in the state or federal courts located in Harris County, Texas.
              </p>
            </motion.div>

            {/* Section 15 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">15. Severability</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </motion.div>

            {/* Section 16 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">16. Entire Agreement</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                These Terms, together with our Privacy Policy and any written quote or order confirmation, constitute the entire agreement between you and YuDezign regarding your use of our services.
              </p>
            </motion.div>

            {/* Section 17 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">17. Contact Information</h2>
              <p className="text-body text-luxury-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-luxury-cream rounded-lg p-6 border border-luxury-sand">
                <p className="text-body text-luxury-gray-900 font-medium mb-2">YuDezign Custom Cabinets</p>
                <p className="text-body text-luxury-gray-600">13366 Murphy Rd</p>
                <p className="text-body text-luxury-gray-600">Stafford, TX 77477</p>
                <p className="text-body text-luxury-gray-600 mt-3">
                  Email: <a href="mailto:orders@yudezign.com" className="text-primary hover:text-primary-light font-medium">orders@yudezign.com</a>
                </p>
                <p className="text-body text-luxury-gray-600">
                  Phone: <a href="tel:+17135020399" className="text-primary hover:text-primary-light font-medium">(713) 502-0399</a>
                </p>
                <p className="text-body text-luxury-gray-600 mt-3">
                  Business Hours: Monday-Friday, 9:00 AM - 5:30 PM
                </p>
              </div>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-luxury-beige border-l-4 border-primary p-6 rounded-r-lg"
            >
              <p className="text-body text-luxury-gray-900 font-medium mb-2">
                Acknowledgment
              </p>
              <p className="text-body text-luxury-gray-600 leading-relaxed">
                BY USING OUR WEBSITE OR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
              </p>
            </motion.div>

          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;