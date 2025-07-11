import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Report_URL from "../../Base/report";
import Catelogue from "../../Base/catelogue";

const CreateReport = ({ report, user }) => {
    const fromDateRef = useRef();
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [format, setFormat] = useState("");

    useEffect(() => {
    const modal = document.getElementById("ViewReport");

    const onShow = () => {
        setTimeout(() => fromDateRef.current?.focus(), 200);
    };

    const onHide = () => {
        setFromDate("");
        setToDate("");
        setFormat("");
    };

    modal?.addEventListener("shown.bs.modal", onShow);
    modal?.addEventListener("hidden.bs.modal", onHide);

    return () => {
        modal?.removeEventListener("shown.bs.modal", onShow);
        modal?.removeEventListener("hidden.bs.modal", onHide);
    };
}, []);


    useEffect(() => {
        const modal = document.getElementById("ViewReport");
        const onShow = () => setTimeout(() => fromDateRef.current?.focus(), 200);

        modal?.addEventListener("shown.bs.modal", onShow);
        return () => modal?.removeEventListener("shown.bs.modal", onShow);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!fromDate || !toDate || !format) {
            toast.error("Please fill all fields.");
            return;
        }

        const firstName = user.Name.split(" ")[0];
        const url = `${Report_URL}/PrintDocuments?InitialCatalog=${Catelogue}&StartDate=${fromDate}&EndDate=${toDate}&reportName=${report.reportName}.rpt&currentUser=${firstName}&format=${format}`;

        window.open(url, "_blank");

    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12">
                    <div className="form-group mt-1">
                        <div className="row">
                            <div className="col-4">
                                <label className="text-dark">From Date</label>
                            </div>
                            <div className="col-8">
                                <input
                                    ref={fromDateRef}
                                    required
                                    type="date"
                                    className="form-control form-control-sm"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        <div className="row">
                            <div className="col-4">
                                <label className="text-dark">To Date</label>
                            </div>
                            <div className="col-8">
                                <input
                                    required
                                    type="date"
                                    className="form-control form-control-sm"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-1">
                        <div className="row">
                            <div className="col-4">
                                <label className="text-dark">Format</label>
                            </div>
                            <div className="col-8 d-flex gap-3 align-items-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="format"
                                        id="pdfFormat"
                                        required
                                        value="pdf"
                                        checked={format === "pdf"}
                                        onChange={(e) => setFormat(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="pdfFormat">
                                        PDF
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="format"
                                        id="excelFormat"
                                        value="excel"
                                        checked={format === "excel"}
                                        onChange={(e) => setFormat(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="excelFormat">
                                        Excel
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-end gap-3 mt-3">
                        <button
                            type="button"
                            id="close-modal-item"
                            data-bs-dismiss="modal"
                            className="btn btn-sm btn-theme-outline"
                        >
                            Cancel
                        </button>
                        <button className="btn btn-sm btn-theme" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateReport;
