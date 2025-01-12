import { IconVector } from '@/assets/IconVector';
import { Box } from '@/shared/components/Box';
import { Text } from '@/shared/components/Typography';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import Share from 'react-native-share';
import { Pressable } from '@/shared/components/Pressable';

const InvoiceGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  // const navigation = useNavigation();

  const generatePDF = async () => {
    try {
      setLoading(true);

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Helvetica, Arial, sans-serif; padding: 20px; }
              .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
              .invoice-number { color: #666; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #f8f9fa; }
              .total-section { margin-top: 20px; text-align: right; }
              .payment-details { margin-top: 40px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h2>Invoice #0001</h2>
                <p>Date: 25/01/2023</p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
              <div>
                <strong>Bill To:</strong>
                <p>Mr Peter Abu</p>
              </div>
              <div>
                <strong>From:</strong>
                <p>Miss Olasubomi Akin</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price(N)</th>
                  <th>Amount(N)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Web Design</td>
                  <td>2.00</td>
                  <td>3,000,000</td>
                  <td>6,000,000</td>
                </tr>
                <tr>
                  <td>Logo Design</td>
                  <td>2.00</td>
                  <td>3,000,000</td>
                  <td>6,000,000</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <p>Subtotal: N12,000,000.00</p>
              <p>Tax: N1,440,000.00</p>
              <p>Shipping: N500,000.00</p>
              <p><strong>Total: N14,900,000.00</strong></p>
            </div>

            <div class="payment-details">
              <h3>Payment Details</h3>
              <p>Bank Name: Lance Bank</p>
              <p>Account Number: 012345678</p>
              <p>Account Name: Jane Doe</p>
            </div>
          </body>
        </html>
      `;
      const options = {
        html,
        fileName: 'invoice',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setLoading(false);
      setShowDownloadModal(true);
      if (file) {
        const shareOptions = {
          title: `Share Invoice`,
          message: '',
          url: `file://${file.filePath}`, // Use file:// prefix
          failOnCancel: false,
        };

        Share.open(shareOptions);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('Failed to generate PDF');
    }
  };

  const ModalOverlay = ({ children }) => (
    <Box
      flex={1}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      justifyContent="center"
      alignItems="center"
      padding="md">
      <Box
        backgroundColor="white"
        borderRadius="lg"
        width="100%"
        maxWidth={400}
        padding="lg">
        {children}
      </Box>
    </Box>
  );

  const DownloadModal = ({ visible, onClose }) => (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <ModalOverlay>
        <Box>
          <Pressable onPress={onClose}>
            <Box position="absolute" left={0} top={0} padding="sm">
              <Text variant="medium16" color="gray">
                ✕
              </Text>
            </Box>
          </Pressable>

          <Box alignItems="center" gap="md" marginTop="md">
            <IconVector name="checkCircle" size="lg" />

            <Text variant="bold16" textAlign="center">
              Download Successful
            </Text>

            <Text
              variant="body"
              textAlign="center"
              paddingHorizontal="lg"
              color="gray">
              Your Invoice was downloaded successfully
            </Text>

            <Pressable
              backgroundColor="primary"
              onPress={onClose}
              width="100%"
              padding="md"
              alignItems="center"
              borderRadius="lg"
              justifyContent="center"
              marginTop="md">
              <Text variant="medium14" color="white">
                Done
              </Text>
            </Pressable>
          </Box>
        </Box>
      </ModalOverlay>
    </Modal>
  );

  const SaveModal = ({ visible, onClose }) => (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <ModalOverlay>
        <Box>
          <Pressable onPress={onClose}>
            <Box position="absolute" left={0} top={0} padding="sm">
              <Text variant="medium14" color="gray">
                ✕
              </Text>
            </Box>
          </Pressable>

          <Box alignItems="center" gap="md" marginTop="md">
            <Text variant="bold16" textAlign="center">
              Save Invoice
            </Text>

            <Text
              variant="body"
              paddingHorizontal="lg"
              textAlign="center"
              color="gray">
              Would you like to save your invoice to be able to edit it later?
            </Text>

            <Box
              flexDirection="row"
              gap="md"
              justifyContent="center"
              width="100%">
              <Pressable
                backgroundColor="primary"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                onPress={() => {
                  setShowSaveModal(false);
                  // navigation.replace('DashboardScreen');
                }}
                flex={1}
                padding="md">
                <Text variant="medium14" color="white">
                  Yes
                </Text>
              </Pressable>

              <Pressable
                backgroundColor="white"
                onPress={onClose}
                borderRadius="lg"
                borderWidth={1}
                borderColor="primary"
                alignItems="center"
                justifyContent="center"
                flex={1}
                padding="md">
                <Text variant="medium14" color="gray">
                  No
                </Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </ModalOverlay>
    </Modal>
  );

  const PreviewInvoice = () => (
    <Box style={styles.previewContainer}>
      <Box style={styles.invoice}>
        <Box style={styles.invoiceHeader}>
          <Box style={styles.logoPlaceholder} />
          <Text style={styles.invoiceNo}>Invoice No. #0001</Text>
        </Box>

        <Box style={styles.addressSection}>
          <Box>
            <Text style={styles.lightText}>Bill To:</Text>
            <Text variant="bold12">Mr Peter Abu</Text>
          </Box>
          <Box>
            <Text style={styles.lightText}>From:</Text>
            <Text variant="bold12">Miss Olasubomi Akin</Text>
          </Box>
        </Box>

        <Box
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
          marginBottom="md">
          <Box>
            <Text variant="medium12">Issuance Name</Text>
            <Text variant="medium12">Website Design For Lancebox</Text>
          </Box>
          <Box>
            <Text variant="medium12">Issuance Date</Text>
            <Text variant="medium12">25/01/2023</Text>
          </Box>
        </Box>

        <Box style={styles.tableContainer}>
          <Box style={styles.tableHeader}>
            <Text variant="medium12" style={styles.descriptionCol}>
              Description
            </Text>
            <Text variant="medium12" style={styles.numberCol}>
              Qty
            </Text>
            <Text variant="medium12" style={styles.numberCol}>
              Unit Price(N)
            </Text>
            <Text variant="medium12" style={styles.numberCol}>
              Amount(N)
            </Text>
          </Box>

          {[
            {
              desc: 'Web Design',
              qty: '2.00',
              price: '3,000,000',
              amount: '6,000,000',
            },
            {
              desc: 'Logo Design',
              qty: '2.00',
              price: '3,000,000',
              amount: '6,000,000',
            },
            {
              desc: 'Web Design',
              qty: '2.00',
              price: '3,000,000',
              amount: '6,000,000',
            },
            {
              desc: 'Logo Design',
              qty: '2.00',
              price: '3,000,000',
              amount: '6,000,000',
            },
          ].map((item, index) => (
            <Box
              key={index}
              style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
              <Text style={[styles.tableCell, styles.descriptionCol]}>
                {item.desc}
              </Text>
              <Text style={[styles.tableCell, styles.numberCol]}>
                {item.qty}
              </Text>
              <Text style={[styles.tableCell, styles.numberCol]}>
                {item.price}
              </Text>
              <Text style={[styles.tableCell, styles.numberCol]}>
                {item.amount}
              </Text>
            </Box>
          ))}
        </Box>

        <Box flexDirection="row" alignItems="center" justifyContent="flex-end">
          <Box style={styles.totalsSection}>
            <Box style={styles.totalRow}>
              <Text>Subtotal:</Text>
              <Text>N12,000,000.00</Text>
            </Box>
            <Box style={styles.totalRow}>
              <Text>Tax:</Text>
              <Text>N1,440,000.00</Text>
            </Box>
            <Box style={styles.totalRow}>
              <Text>Shipping:</Text>
              <Text>N500,000.00</Text>
            </Box>
            <Box style={[styles.totalRow, styles.finalTotal]}>
              <Text variant="bold12">Total:</Text>
              <Text variant="bold12">N14,900,000.00</Text>
            </Box>
          </Box>
        </Box>

        <Box
          flexDirection="row"
          borderTopColor="gray400"
          borderTopWidth={1}
          marginTop="md"
          paddingVertical="md"
          justifyContent="space-between">
          <Box>
            <Text variant="medium12">Terms Of Payment</Text>
            <Text variant="bold10">Payment will be made in installments</Text>
          </Box>
          <Box>
            <Text variant="medium12">Payment Details</Text>
            <Text variant="medium12">Bank Number: 012345678</Text>
            <Text variant="medium12">Bank Name: Lance Bank</Text>
            <Text variant="medium12">Account Name: Jane Doe</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PreviewInvoice />
      </ScrollView>
      <Box style={styles.buttonContainer}>
        <TouchableOpacity onPress={generatePDF} style={styles.downloadButton}>
          <Text
            style={(styles.buttonText, [{ opacity: loading ? 0.5 : 1 }])}
            color={loading ? 'white' : 'textColor'}
            disabled={loading}>
            {loading ? 'Saving PDF...' : 'Download Pdf'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailButton}>
          <Text color="primary" variant="medium14">
            Send To Client Email
          </Text>
        </TouchableOpacity>
      </Box>
      <DownloadModal
        onClose={() => {
          setShowDownloadModal(false);
          setShowSaveModal(true);
        }}
        visible={showDownloadModal}
      />
      <SaveModal
        visible={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStep: {
    backgroundColor: '#4CAF50',
  },
  currentStep: {
    backgroundColor: '#2196F3',
  },
  stepText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  activeStepText: {
    color: '#333',
  },
  connector: {
    height: 2,
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    top: 12,
    left: '60%',
    right: '-60%',
    zIndex: -1,
  },
  completedConnector: {
    backgroundColor: '#4CAF50',
  },
  scrollView: {
    flex: 1,
  },
  previewContainer: {
    marginTop: 20,
    padding: 2,
  },
  invoice: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  invoiceNo: {
    color: '#666',
    marginLeft: 20,
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lightText: {
    color: '#666',
    marginBottom: 4,
  },

  projectSection: {
    marginBottom: 20,
  },
  projectTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#666',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
  },

  tableRow: {
    flexDirection: 'row',
    padding: 10,
  },
  evenRow: {
    backgroundColor: 'rgba(135, 193, 248, 0.15)',
    borderColor: 'transparent',
  },
  tableCell: {
    fontSize: 12,
  },
  descriptionCol: {
    flex: 2,
  },
  numberCol: {
    // flex: 1,
    marginRight: 10,
  },
  totalsSection: {
    width: '50%',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  finalTotal: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },

  paymentSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  downloadButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
  },
  emailButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default InvoiceGenerator;
