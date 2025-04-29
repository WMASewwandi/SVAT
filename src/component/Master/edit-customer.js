const EditCustomer = () => {
  return (
    <form>
      <div className="row">
        <div className="col-12">
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">IBS Code</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Sap Code</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Customer Name</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">VAT No</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">SVAT No</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 1</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 2</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Address 3</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Email</label>
              </div>
              <div className="col-8">
                <input type="email" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Fax No</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-dark">Contact No</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row d-flex justify-content-end">
              <div className="col-8">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Allow Edit
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group d-flex justify-content-between gap-3 mt-3">
            <button className="btn btn-sm btn-theme-outline">Cancel</button>
            <button className="btn btn-sm btn-theme">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCustomer;
