import { Box, Button, Checkbox, Grid, Modal, Typography } from "@mui/material";
import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import styles from "./invoice-report-style";
import LOGO from "../../assets/report/lg.jpg";
import { formatCurrency, formatDate } from "../Formats";
import Base_URL from "../../Base/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 900, xs: 300 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const InvoiceReport = ({ invoice }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(invoice.InvoiceItems);
  const [suspendedTaxTotal, setSuspendedTaxTotal] = useState(0);
  const [amountTotal, setAmountTotal] = useState(0);
  const [svatRate, setSVATRate] = useState(0);
  const [svat, setSVAT] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/settings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Fetching failed");
        }

        const data = await response.json();
        const value =
          parseFloat(data.find((item) => item.Description === "SVAT")?.Value) ||
          0;

        setSVATRate(value);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const suspendedVatTotal = invoice.InvoiceItems.reduce(
      (sum, item) => sum + (parseFloat(item?.TaxBase) || 0),
      0
    );

    const amtTotal = invoice.InvoiceItems.reduce(
      (sum, item) => sum + (parseFloat(item?.Amount) || 0),
      0
    );

    const calculateSVAT = (amtTotal * svatRate) / 100;

    setSuspendedTaxTotal(suspendedVatTotal);
    setAmountTotal(amtTotal);
    setSVAT(calculateSVAT);

  }, [invoice.InvoiceItems, svatRate]);

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.box}>
          <View style={styles.subbox}>
            <Text>DHL KEELS (PVT) LTD</Text>
            <Text>148, Vauxhall Street,</Text>
            <Text>Colombo 2,</Text>
            <Text>Sri Lanka.</Text>
            <Text>Tel : +94 114 798 600</Text>
            <Text>VAT Reg No : 1140271467000/SVAT 000959</Text>
          </View>
          <View style={styles.subbox}>
            <Text style={styles.bottom}>SUSPENDED TAX INVOICE</Text>
          </View>
          <View style={[styles.subbox, styles.logo]}>
            <Image style={styles.logoImage} src={LOGO} />
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, borderRight: "none" }}>
            <Text>{invoice.CustomerName ?? "-"}</Text>
            <Text>{invoice.Address1 ?? ""}</Text>
            <Text style={{ marginBottom: "10px" }}>
              {invoice.Address2 ?? ""}
            </Text>
            <Text>Attn : {invoice.Accountant ?? ""}</Text>
            <Text>Contact Number : {invoice.ContactNo ?? ""}</Text>
          </View>
          <View
            style={{
              ...styles.subbox,
              borderRight: "none",
              borderLeft: "none",
            }}
          >
            <Text>VAT No: {invoice.VAT ?? ""}</Text>
            <Text>SVAT No: {invoice.SVAT ?? ""}</Text>
          </View>
          <View style={{ ...styles.subbox, borderLeft: "none" }}>
            <Text>Account No : {invoice.AccountNo ?? ""}</Text>
            <Text>Document No : {invoice.Document ?? ""}</Text>
            <Text>HAWB No : {invoice.HAWB ?? ""}</Text>
            <Text>Date : {formatDate(invoice.InvoiceDate) ?? ""}</Text>
            <Text>
              Payment Due Date : {formatDate(invoice.PaymentDate) ?? ""}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, border: "none" }}>
            <Text style={{ textAlign: "center", fontSize: "11px" }}>
              Please reimburse the Total Charges Shown Below to:
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, borderBottom: "none" }}>
            <Text style={{ textAlign: "center", fontSize: "11px" }}>
              Shipment Details
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: 0 }}>
          <View style={{ ...styles.subbox, borderRight: "none" }}>
            <Text>Origin : {invoice.Origin ?? 0}</Text>
            <Text>Destination : {invoice.Destination ?? ""}</Text>
          </View>
          <View
            style={{
              ...styles.subbox,
              borderRight: "none",
              borderLeft: "none",
            }}
          >
            <Text>Pieces : {invoice.Pieces ?? 0}</Text>
            <Text>Weight : {invoice.Weight ?? 0}</Text>
          </View>
          <View
            style={{
              ...styles.subbox,
              borderRight: "none",
              borderLeft: "none",
            }}
          >
            <Text>Contents : {invoice.Content ?? 0}</Text>
            <Text>Assessed Values : {invoice.AssessedValue ?? 0}</Text>
          </View>
          <View style={{ ...styles.subbox, borderLeft: "none" }}>
            <Text>Arrival Date : {formatDate(invoice.ArrivalDate) ?? ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, borderBottom: "none" }}>
            <Text style={{ textAlign: "center", fontSize: "11px" }}>
              Billing Details
            </Text>
          </View>
        </View>
        <View style={[styles.table, styles.tableHeader]}>
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCell, borderBottom: "none" }}>
              Item Code
            </Text>
            <Text style={{ ...styles.tableCell, borderBottom: "none" }}>
              Description
            </Text>
            <Text style={{ ...styles.tableCell, borderBottom: "none" }}>
              Tax
            </Text>
            <Text style={{ ...styles.tableCell, borderBottom: "none" }}>
              Tax Rate (%)
            </Text>
            <Text style={{ ...styles.tableCell, borderBottom: "none" }}>
              Tax Base
            </Text>
            <Text
              style={[
                styles.lastTableCell,
                styles.tableCellleft,
                { borderBottom: "none" },
              ]}
            >
              Amount
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          {items.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, textAlign: "left" }}>
                No Items Available
              </Text>
            </View>
          ) : (
            items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.ItemCode ?? ""}</Text>
                <Text style={styles.tableCell}>{item.ItemDesc ?? ""}</Text>
                <Text style={styles.tableCell}>{item.Tax ?? ""}</Text>
                <Text style={styles.tableCell}>{item.TaxRate ?? ""}</Text>
                <Text style={styles.tableCell}>
                  {formatCurrency(item.TaxBase)}
                </Text>
                <Text style={[styles.lastTableCell, styles.tableCellleft]}>
                  {formatCurrency(item.Amount)}
                </Text>
              </View>
            ))
          )}
        </View>
        <View style={[styles.table1, styles.tableHeader]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellleft]}>
              Grand Total
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellleft,
                { borderRight: "none" },
              ]}
            >
              {formatCurrency(amountTotal)}
            </Text>
          </View>
        </View>
        <View style={[styles.table1, styles.tableHeader]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellleft]}>
              Suspended SVAT Charges
            </Text>
            <Text
              style={[
                styles.tableCell,
                styles.tableCellleft,
                { borderRight: "none" },
              ]}
            >
              {formatCurrency(suspendedTaxTotal)}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.subbox}>
            <Text style={{ textAlign: "center" }}>Payment terms</Text>
            <Text style={{ textAlign: "center" }}>cash on delivery unless</Text>
            <Text style={{ textAlign: "center" }}>
              stated otherwise on this document
            </Text>
          </View>
          <View
            style={{
              ...styles.subbox,
              borderRight: "none",
              borderLeft: "none",
            }}
          ></View>
          <View style={{ ...styles.subbox, borderLeft: "none" }}></View>
        </View>
        <View style={[styles.table1, { border: "none" }]}>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCell,
                { border: "none", textAlign: "left", fontSize: "7px" },
              ]}
            >
              Payment Terms
            </Text>
            <Text
              style={[
                styles.tableCell,
                { border: "none", textAlign: "right", fontSize: "7px" },
              ]}
            >
              Please pay this amount: LKR
            </Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "right", borderLeft: "1px solid #000" },
              ]}
            >
              {formatCurrency(amountTotal)}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.table1,
            {
              borderLeft: "none",
              borderRight: "none",
              paddingBottom: "10px",
              borderBottom: "1px dashed #000",
            },
          ]}
        >
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { border: "none" }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { border: "none", textAlign: "right", fontSize: "7px" },
              ]}
            >
              Suspended VAT @ {svatRate}%
            </Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "right", borderLeft: "1px solid #000" },
              ]}
            >
              {formatCurrency(svat)}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, border: "none", marginTop: "5px" }}>
            <Text style={{ textAlign: "center", fontSize: "11px" }}>
              Remittance Advise
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: 0 }}>
          <View style={{ ...styles.subbox, borderRight: "none" }}>
            <Text>Company Signature/Stamp :</Text>
            <View style={{ ...styles.innerSubbox }}>
              <View style={styles.checkbox}></View>
              <Text>We enclose cash for LKR {formatCurrency(amountTotal)}</Text>
            </View>
            <View style={{ ...styles.innerSubbox }}>
              <View style={styles.checkbox}></View>
              <Text>
                We enclose cheque No. ____________ for LKR{" "}
                {formatCurrency(amountTotal)}
              </Text>
            </View>
            <View style={{ ...styles.innerSubbox }}>
              <View style={styles.checkbox}></View>
              <Text>Please debit our Credit/Charge Card No. ____________</Text>
            </View>
            <View style={{ ...styles.innerSubbox }}>
              <View style={{ ...styles.checkbox, border: "none" }}></View>
              <Text>Cardholder Name: ____________</Text>
            </View>
            <View style={{ ...styles.innerSubbox }}>
              <View style={{ ...styles.checkbox, border: "none" }}></View>
              <Text>Expiry Date: ____________</Text>
            </View>
          </View>
          <View style={{ ...styles.subbox, borderLeft: "none" }}>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Account Number :</Text>
              <Text>{invoice.AccountNo ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Document Number :</Text>
              <Text>{invoice.Document ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>HAWB Number :</Text>
              <Text>{invoice.HAWB ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Date :</Text>
              <Text>{formatDate(invoice.InvoiceDate) ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Total Amount LKR :</Text>
              <Text>{formatCurrency(amountTotal) ?? ""}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.table1, { border: "none" }]}>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCell,
                { border: "none", textAlign: "left", fontSize: "7px" },
              ]}
            >
              Not all payment options are available to all
            </Text>
          </View>
          <View style={{ ...styles.box, borderBottom: "1px dashed #000" }}>
            <View style={{ ...styles.subbox, border: "none" }}>
              <Text style={{ textAlign: "left", fontSize: "7px" }}>
                1. Detach this payment advice and return it togeather with your
                payment
              </Text>
              <Text style={{ textAlign: "left", fontSize: "7px" }}>
                2. Cheque should be crossed and made payable to DHL
                KEELLS (PVT) LTD
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <View style={{ ...styles.subbox, border: "none", marginTop: "5px" }}>
            <Text style={{ textAlign: "center", fontSize: "11px" }}>
              Customer Endorsement
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: "-5px" }}>
          <View style={{ ...styles.subbox, border: "none" }}>
            <View style={{ ...styles.innerSubbox }}>
              <View style={styles.checkbox}></View>
              <Text style={{ marginRight: "15px" }}>CUSTOM DECLARATION</Text>
              <View style={styles.checkbox}></View>
              <Text style={{ marginRight: "15px" }}>ASSESMENT NOTICE</Text>
              <View style={styles.checkbox}></View>
              <Text style={{ marginRight: "15px" }}>
                IMPORT CONTROL LICENSE
              </Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: 0 }}>
          <View style={{ ...styles.subbox, borderRight: "none" }}>
            <Text>We acknowledgr receipt of the above documentation</Text>
            <Text>{invoice.CustomerName ?? "-"}</Text>
            <Text>{invoice.Address1 ?? "-"}</Text>
            <Text>{invoice.Address2 ?? "-"}</Text>
            <Text style={{ marginTop: "10px" }}>Company Signature/Stamp :</Text>
            <Text style={{ marginTop: "10px", marginBottom: "10px" }}>
              Printed Name/Title :
            </Text>
          </View>
          <View style={{ ...styles.subbox, borderLeft: "none" }}>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Account Number :</Text>
              <Text>{invoice.AccountNo ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Document Number :</Text>
              <Text>{invoice.Document ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>HAWB Number :</Text>
              <Text>{invoice.HAWB ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Date :</Text>
              <Text>{formatDate(invoice.InvoiceDate) ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Total Amount LKR :</Text>
              <Text>{formatCurrency(amountTotal) ?? ""}</Text>
            </View>
            <View style={{ ...styles.innerSubbox2 }}>
              <Text>Cheque Number:</Text>
              <Text></Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <>
      <button className="btn btn-sm" type="button" onClick={handleOpen}>
        <i className="fa text-primary fa-print" style={{ fontSize: "1.2rem" }}></i>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="h5">Invoice Report</Typography>
              <Typography variant="h5">
                Invoice No: {invoice.InvoiceNo}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
              <PDFViewer width="100%" height={500}>
                {MyDocument}
              </PDFViewer>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Button variant="contained" onClick={handleClose} color="error">
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default InvoiceReport;
