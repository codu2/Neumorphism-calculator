function getHistory() {
    return document.getElementById('history-value').innerText;
}

function printHistory(num) {
    document.getElementById('history-value').innerText = num;
}

function getOutput() {
    return document.getElementById('output-value').innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById('output-value').innerText = num;
    } else {
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString('en');
    return value;
    /*숫자 천 단위마다 ,(콤마) 찍기 : 
    num은 숫자 텍스트, toLocalString은 Number 타입의 내장 함수이며 인자로 들어온 지역 값에 따른 숫자 표기 방식을 적용하여
    문자열로 반환하는 역할을 함.
    'en'은 영어권 국가의 숫자 표기 방식을 사용하겠다고 지정한 것으로, 3자리마다 숫자를 끊어 콤마를 삽입하여 사용함
    만약 지역값을 입력하지 않고 호출하는 경우, 해당 시스템의 지역 값에 따라서 숫자가 표기되는데, 시스템에 따라서 뒤에 소수점 2자리가 붙는 경우도 있음
    이때에는 소수점을 없애는 split(".")[0] 메서드를 추가해주면 됨*/
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
    /*num에서 모든 ,를 '', 즉 공백으로 교체하여 반환함
    replace() 메서드는 어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환함
    그 패턴은 문자열이나 정규표현식이 될 수 있음
    즉 num이 1234567이었다면 getFormattedNumber(num)으로 인해
    1,234,567로 표시됨. 이때 reverseNumberFormat(num)은 num의 값을 
    1234567로 반환함*/
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {//if output has a value
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if (this.id == "%") {
                output *= 0.01;
                printOutput(output);
            }
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result = (new Function('return ' + history))();
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    });
}