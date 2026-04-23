$(document).ready(function () {

    $("#loadWeather").click(function () {

        $("#result").html(`
            <div class="col-md-6 text-center text-white loading">
                <div class="spinner-border text-light mb-3"></div>
                <p>Mengambil data cuaca kota Tegal...</p>
            </div>
        `);

        $.ajax({
            // 🔥 KOORDINAT KOTA TEGAL
            url: "https://api.open-meteo.com/v1/forecast?latitude=-6.87&longitude=109.14&current_weather=true",
            method: "GET",
            success: function (data) {

                let temp = data.current_weather.temperature;
                let wind = data.current_weather.windspeed;
                let weatherIcon = "☀️";

                if (temp < 20) {
                    weatherIcon = "❄️";
                } else if (temp < 30) {
                    weatherIcon = "⛅";
                } else {
                    weatherIcon = "🔥";
                }

                let output = `
                    <div class="col-md-6">
                        <div class="card weather-card text-center shadow-lg">
                            <div class="card-body">
                                <h4 class="fw-bold mb-3">
                                    ${weatherIcon} Cuaca Kota Tegal
                                </h4>
                                <p class="fs-5">
                                    🌡️ Suhu: <strong>${temp}°C</strong>
                                </p>
                                <p class="fs-5">
                                    💨 Kecepatan Angin: <strong>${wind} km/h</strong>
                                </p>
                                <span class="badge bg-success px-3 py-2">
                                    Data Real-time Kota Tegal
                                </span>
                            </div>
                        </div>
                    </div>
                `;

                $("#result").html(output);
            },
            error: function () {
                $("#result").html(`
                    <div class="col-md-6 text-center text-danger">
                        ❌ Gagal mengambil data cuaca kota Tegal
                    </div>
                `);
            }
        });

    });

});
