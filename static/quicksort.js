var QuickSort = function (container, random) {

    var that = this;

    this.container = container;
    this.random = random;

    this.numbers = [];
    this.time = 100;
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

        var color = '#0090ff';
        that.context.fillStyle = color;
        that.context.fillRect(number, i, 3, 3);
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
    		pivot = Math.floor((first + last) / 2); // middle pivot
    	}
    	x = numbers[pivot];

    	do {
    		while (numbers[i] < x) {
    			i++;
    			this.count++;
    		}

    		while (x < numbers[j]) {
    			j--;
    			this.count++;
    		}

    		if (i <= j) {
    			this.swap(numbers, i, j);

    			i++;
    			j--;
    		}
    	} while (i <= j);

        setTimeout(function () {
    	    that.sort(numbers, first, j);
    	}, this.time);
    	setTimeout(function () {
        	that.sort(numbers, i, last);
    	}, this.time);
    }
};

QuickSort.prototype.conquer = function (numbers, first, second) {
    
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
