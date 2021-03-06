var QuickSort = function (container, random) {

    var that = this;

    this.container = container;
    this.random = random;

    this.numbers = [];
    this.time = 50;
    this.context = this.container.find('.plot').get(0).getContext('2d');
    this.count = 0;

    setInterval(function () {
        that.draw();
    }, 100);
};

QuickSort.prototype.clear = function () {
    this.context.clearRect(0, 0, 500, 500);
};

QuickSort.prototype.draw = function () {

    this.clear();

    var that = this;
    $(this.numbers).each(function (i, number) {

        var color = '#d6e7f3';
        that.context.fillStyle = color;
        that.context.fillRect(i + 1, number, 1, 500);

        var color = '#0090ff';
        that.context.beginPath();
        that.context.arc(i + 1, number, 2, 0, Math.PI * 2, true);  
        that.context.fillStyle = color;
        that.context.fill();
    });

    this.container.find('.count').text(this.count);
};

QuickSort.prototype.sort = function (numbers, first, last) {

    var x;
    var i = first;
    var j = last;
    var that = this;

    if (first < last) {

    	var pivot;
    
    	if (this.random) {
    		pivot = Math.floor(Math.random() * (last - first + 1) + first); // random pivot
    	} else {
    		//pivot = Math.floor((first + last) / 2); // middle pivot
    		pivot = first; // first as pivot
    	}
    	x = numbers[pivot];

        setTimeout(function () {
            that.conquer(numbers, x, first, last, i, j);
    	}, this.time);
    }
};

QuickSort.prototype.conquer = function (numbers, x, first, last, i, j) {

    var that = this;

	while (numbers[i] < x) {
		i++;
		this.count++;
	}
	this.count++;

	while (x < numbers[j]) {
		j--;
		this.count++;
	}
	this.count++;

	if (i <= j) {
		this.swap(numbers, i, j);

		i++;
		j--;
	}

	if (i <= j) {

        setTimeout(function () {
            that.conquer(numbers, x, first, last, i, j);
    	}, this.time);

	} else {

        setTimeout(function () {
    	    that.sort(numbers, first, j);
    	}, this.time);

    	setTimeout(function () {
        	that.sort(numbers, i, last);
    	}, this.time);
	}
};

QuickSort.prototype.swap = function (numbers, first, second) {
	var temp = numbers[first];
	numbers[first] = numbers[second];
	numbers[second] = temp;
};

QuickSort.prototype.move = function (left, right) {

    var both = left.add(right);
    both.css('z-index', 2000);
    both.addClass('success');

    var leftPosition = left.position();
    var leftClass = left.attr('class');

    left.attr('class', right.attr('class'));
    right.attr('class', leftClass);

    left.animate({left: right.position().left}, this.time / 2, function () {
        left.removeClass('success');
    });
    right.animate({left: leftPosition.left}, this.time / 2, function () {
        right.removeClass('success');
    });
};

QuickSort.prototype.start = function () {
    this.count = 0;
    this.sort(this.numbers, 0, this.numbers.length - 1);
};
