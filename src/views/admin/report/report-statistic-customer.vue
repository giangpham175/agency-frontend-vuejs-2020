<template>
  <div class="report-statistic-customer">
    <h3 class="mt-3 font-bold">Thống kê khách hàng</h3>
    <div class="row">
      <div class="col-5">
        <p>Chọn khoảng thời gian cần xem doanh số</p>
      </div>
      <div class="col-7">
        <div class="card shadow-0">
          <div class="card-body row align-items-center py-1">
            <div class="col-1">
              <i class="material-icons font-light mr-3">calendar_today</i>
            </div>
            <div class="col-11">
              <div class="row">
                <p class="m-0 bold">11-03-2019</p>
                <p class="m-0 ml-2 mr-2">đến</p>
                <p class="m-0 bold">19-03-2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <p>Nhập User name cần xem thống kê</p>
      </div>
      <div class="col-7">
        <input class="form-control input-white" type="text" placeholder="Nhập User name" />
      </div>
    </div>

    <!-- chart -->
    <h1 class="mt-3 text-center">CHART</h1>
  </div>
</template>