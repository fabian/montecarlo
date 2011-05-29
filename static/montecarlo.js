
var MonteCarlo = function (steps, start, end) {
    this.total = 0.0;
    this.found = 0.0;
    this.history = [];
    this.context = document.getElementById('plot').getContext('2d');
}

MonteCarlo.prototype.clear = function () {
    this.context.clearRect(0, 0, 600, 600);
};

MonteCarlo.prototype.calc = function (sample) {

    for (var i = 0; i < sample; i++) {

        var x = Math.random();
        var y = Math.random();

        var color = '#ff9000';
        if (Math.sqrt(x * x + y * y) <= 1) {
            this.found += 1;
            color = '#0090ff';
        }
        this.context.fillStyle = color;
        this.context.fillRect(x * 600, y * 600, 1, 1);

        this.total += 1;
    }

    var pi = this.found / this.total * 4;
    $('#points').text(this.total);
    $('#pi').text(pi.toFixed(20));
    $('#diff').text(Math.abs((pi - Math.PI)).toFixed(20));
    $('#start').attr('disabled', 'disabled');

    if (this.total < 1000000) {

        var that = this;
        setTimeout(function () {
            that.calc(sample);
        }, 1);

    } else {

        this.total = 0.0;
        this.found = 0.0;
        this.history[this.history.length] = pi;
        
        $('#start').attr('disabled', '');
    }
};
