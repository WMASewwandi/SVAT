import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    padding: 20,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderBottom: "none",
    marginTop: 0,
  },
  logo: {
    border: "none",
  },
  logoImage: {
    width: "100%",
    height: "50px",
    top: 0,
    position: "absolute",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "5px",
    justifyContent: "space-between",
  },
  subbox: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 9,
    textAlign: "left",
    display: "flex",
  },
  bottom: {
    marginTop: "auto",
    textAlign: "center",
    borderTop: "1px solid #000",
    paddingTop: "5px",
  },
  table1: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderBottom: "none",
    borderTop: "none",
    marginTop: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 9,
    textAlign: "center",
  },
  tableCellleft: {
    textAlign: "right",
  },
  lastTableCell: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 9,
    textAlign: "center",
  },
  innerSubbox: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 0,
    gap: 5,
    marginTop: '4px'
  },
  innerSubbox2: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 0,
    gap: 10,
    marginTop: '4px',
    marginLeft: '40px'
  },
  checkbox: {
    border: "1px solid #000",
    width: "10px",
  },
});

export default styles;
