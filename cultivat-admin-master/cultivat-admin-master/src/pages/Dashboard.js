import React from "react";

const Dashboard = () => {


  return (
    <>
      <div className="page-header">
        <h4>Dashboard</h4>
      </div>
      <div className="card bg-white border-rounded-15">
        <div className="card-body">
          <div className="row g-2 mb-3 flex-between align-items-center">
            <div className="col-sm-6">
              <h5
                className="d-flex align-items-center text-capitalize mb-0"
                style={{ gap: "10px" }}
              >
                <img
                  src="https://img.icons8.com/color/30/total-sales-1.png"
                  alt="total-sales-1"
                />
                Business Analytics
              </h5>
            </div>
            <div className="col-sm-6 d-flex justify-content-end">
              <select
                className="custom-select w-auto"
                name="statistics_type"
                onchange="order_stats_update(this.value)"
              >
                <option value="overall">Overall statistics</option>
                <option value="today">Todays Statistics</option>
                <option value="this_month">This Months Statistics</option>
              </select>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-sm-6 col-lg-3 mb-2">
              <div className="business-analytics">
                <p className="business-analytics-subtitle">Total Sales</p>
                <h4 className="business-analytics-title">payment</h4>
                <img
                  className="business-analytics-img"
                  src="https://img.icons8.com/color/48/sales-performance.png"
                  alt="sales-performance"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              <div className="business-analytics">
                <p className="business-analytics-subtitle">Total Store</p>
                <h4 className="business-analytics-title">payment</h4>
                <img
                  className="business-analytics-img"
                  src="https://img.icons8.com/color/48/small-business.png"
                  alt="small-business"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              <div className="business-analytics">
                <p className="business-analytics-subtitle">Total Products</p>
                <h4 className="business-analytics-title">payment</h4>
                <img
                  className="business-analytics-img"
                  src="https://img.icons8.com/fluency/48/fast-moving-consumer-goods.png"
                  alt="fast-moving-consumer-goods"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              <div className="business-analytics">
                <p className="business-analytics-subtitle">Total Customers</p>
                <h4 className="business-analytics-title">payment</h4>
                <img
                  src="https://img.icons8.com/color/48/budget.png"
                  alt="budget"
                  className="business-analytics-img"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
                    alt="img"
                  />
                  <h6 className="order-stats-subtitle">Pending</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://img.icons8.com/color/48/checked-radio-button--v1.png"
                    alt="checked-radio-button--v1"
                  />
                  <h6 className="order-stats-subtitle">Completed</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://img.icons8.com/color/48/cardboard-box.png"
                    alt="cardboard-box"
                  />
                  <h6 className="order-stats-subtitle">Packing</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={28}
                    src="https://img.icons8.com/color/48/deliver-food.png"
                    alt="deliver-goods"
                  />
                  <h6 className="order-stats-subtitle">On the Way</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://img.icons8.com/color/48/task-completed.png"
                    alt="delivered"
                  />
                  <h6 className="order-stats-subtitle">Delivered</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://img.icons8.com/color/48/cancel-order.png"
                    alt="cancel-order"
                  />
                  <h6 className="order-stats-subtitle">Cancel Order</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://6valley.6amtech.com/public/assets/back-end/img/returned.png"
                    alt="Returned"
                  />
                  <h6 className="order-stats-subtitle">Returned</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
            <div className="col-sm-6 col-lg-3 mb-2">
              {/* Card */}
              <a className="order-stats order-stats_pending" href="/">
                <div
                  className="order-stats-content"
                  style={{ textAlign: "left" }}
                >
                  <img
                    width={20}
                    src="https://img.icons8.com/color/48/fail.png"
                    alt="fail"
                  />
                  <h6 className="order-stats-subtitle">Fail to Deliver</h6>
                </div>
                <span className="order-stats-title">58</span>
              </a>
              {/* End Card */}
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-white border-rounded-15">
        <div className="card-body">
          <div className="row g-2 flex-between align-items-center">
            <div className="col-sm-6">
              <h5
                className="d-flex align-items-center text-capitalize mb-0"
                style={{ gap: "10px" }}
              >
                <img
                  src="https://img.icons8.com/color/30/man-holding-bags-with-money.png"
                  alt="man-holding-bags-with-money"
                />
                Earnings Statistics
              </h5>
            </div>
            <div className="col-sm-6 d-flex justify-content-end">
              <ul class="option-select-btn">
                <li>
                  <label class="basic-box-shadow">
                    <input
                      type="radio"
                      name="statistics2"
                      hidden=""
                      checked=""
                    />
                    <span
                      data-earn-type="yearEarn"
                      onclick="earningStatisticsUpdate(this)"
                    >
                      This Year
                    </span>
                  </label>
                </li>
                <li>
                  <label class="basic-box-shadow">
                    <input type="radio" name="statistics2" hidden="" />
                    <span
                      data-earn-type="MonthEarn"
                      onclick="earningStatisticsUpdate(this)"
                    >
                      This Month
                    </span>
                  </label>
                </li>
                <li>
                  <label class="basic-box-shadow">
                    <input type="radio" name="statistics2" hidden="" />
                    <span
                      data-earn-type="WeekEarn"
                      onclick="earningStatisticsUpdate(this)"
                    >
                      This Week
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <h2>table</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <div className="card h-100">
            <h5 className="card-header bg-primary text-white">
              <img
                src="https://img.icons8.com/color/25/prize.png"
                alt="prize"
              />Top Customers
            </h5>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100">
            <h5 className="card-header bg-primary text-white">
              <img
                src="https://img.icons8.com/color/25/prize.png"
                alt="prize"
              />Top Sellers
            </h5>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card h-100">
            <h5 className="card-header bg-primary text-white">
              <img
                src="https://img.icons8.com/color/25/prize.png"
                alt="prize"
              />Top Products
            </h5>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
