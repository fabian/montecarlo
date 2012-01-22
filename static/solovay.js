
// JavaScript modulo is broken
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}

// ported from http://www.beached.org/sites/cryptography/
function solovay(n, tests) {

    var a, j, l, s = [];

    // limit tests to n - 1
    if (tests >= n) {
        tests = n - 1;
    }

    for (var i = 1; i <= tests; i++) {

        // draw random number never used before
        while (true) {
            a = Math.floor(Math.random() * (n - 1) + 1);
            if (s.indexOf(a) > -1) {
                continue;
            } else { 
                s.push(a);
                break;
            }
        }

        if (n == 2) {
            return "Yes, 2 is prime (obviously).";
        }
        if (n.mod(2) == 0) {
            return "Not prime (input is even).";
        }

        // calculate jacobi and fermat
        j = jacobi(a, n).mod(n);
        l = modInt(int2bigInt(Math.pow(a, (n-1)/2), 1, 1), n); // original 
        l = parseInt(bigInt2str(powMod(int2bigInt(a, 10, 0), int2bigInt((n-1)/2, 10, 0), int2bigInt(n, 10, 0)), 10)); // with BigInt.js
        if (l != j) {
            return "Not prime!"
        }
    }
    return "Possibly prime with probability of " + (100 - (1 / Math.pow(2, tests)  * 100)) + "% (random number " + a + ")";
}

function jacobi(n, m) {
    if (ggT(n, m) != 1) {
        console.log("Error in jacobi(" + n + ", " + m + "), ggT(n,m) not 1");
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    if (n.mod(2) == 0) { 
        if (m.mod(8) == 3 || m.mod(8) == 5) {
            return (-1) * jacobi(n/2, m);
        } else {
            return jacobi(n/2, m);
        }
    }
    if (n > m) {
        return jacobi(n.mod(m), m);
    }
    if (n.mod(4) == 3 && m.mod(4) == 3) {
        return (-1) * jacobi(m, n);
    } else {
        return jacobi(m, n);
    }
}

function ggT(a, b) {
    var r;
    while (true) {
        r = a.mod(b);
        if (r == 0) {
            return b;
        } else {
            a = b;
            b = r;
        }
    }
}
