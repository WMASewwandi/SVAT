const EditItem = () => {
  return (
    <form>
      <div className="row">
        <div className="col-12">
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Item Code</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Item Description</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Sap Account Code</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Sap GL Code</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Amount</label>
              </div>
              <div className="col-8">
                <input type="text" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Tax Option</label>
              </div>
              <div className="col-8 d-flex">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="taxOption"
                    id="inlineRadio1"
                    value="enabled"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Tax Enabled
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="taxOption"
                    id="inlineRadio2"
                    value="suspended"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Suspended Tax Enabled
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mt-1">
            <div className="row">
              <div className="col-4">
                <label className="text-secondary">Tax Rate</label>
              </div>
              <div className="col-8">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" />
                  <span className="input-group-text">%</span>
                </div>
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
            <button className="btn btn-sm btn-theme">Update</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditItem;
