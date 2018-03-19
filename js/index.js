var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  Williamson, M. R., Dial, K. P., & Biewener, A. A. (2001). Pectoralis muscle performance during ascending and slow level flight in mallards (Anas platyrhynchos). Journal of Experimental Biology, 204(3), 495-507.
  Lokemoen, J. T., Johnson, D. H., & Sharp, D. E. (1990). Weights of wild mallard Anas platyrhynchos, gadwall A. strepera, and blue-winged teal A. discors during the breeding season. Wildfowl, 41(41), 122-132.
  */
var dHp = 1.2 * 17 / 745.7;
var hDp = 745.7 / (1.2 * 17);

// um thanks Barak (https://stackoverflow.com/a/8831937)
String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// thanks friend Vitim.us - https://stackoverflow.com/a/7924240
function occurrences(string, subString, allowOverlapping) {

  string += "";
  subString += "";
  if (subString.length <= 0) return string.length + 1;

  var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

var unicodeMap = {
  "0️⃣": '0',
  "1️⃣": "1",
  "2️⃣": "2",
  "3️⃣": "3",
  "4️⃣": "4",
  "5️⃣": "5",
  "6️⃣": "6",
  "7️⃣": "7",
  "8️⃣": "8",
  "9️⃣": "9",
  "🔟": "10",
  "💯": "100",
  "🔞": "12",
  "📆": "17",
  "🔢": "1234"
};

function uniParseInt(int) {
  int = _.split(int, '').map(function (e) {
    return unicodeMap.hasOwnProperty(e) ? unicodeMap[e] : e;
  }).join('');
  return parseInt(int);
}

//name=what you're converting to, value=input, func=function that converts, alternativenames=[] 
function convertToXPower() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
    return x;
  };
  var alternativenames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (!value) return '';
  var intVal = uniParseInt(value);
  if (typeof value == "string" && isNaN(intVal)) {
    value = value.toLowerCase().trim();
    if (value.indexOf(name.toLowerCase()) != -1 || alternativenames.some(function (x) {
      return value.indexOf(x) != -1;
    })) {
      return "Good try###" + convertToXPower(name, occurrences(value, name, false), func) + convertToXPower(name, alternativenames.map(function (x) {
        return occurrences(value, x, false);
      }).reduce(function (x, y) {
        return x + y;
      }, 0), func);
    }
    var wp = value.hashCode();
    switch (wp) {
      case 1070909254:
      case 1070919158:
        return "Hey, that's not nice";
      case 507491739:
        return "No cheating";
      case 294058330:
      case -683705998:
      case -839019812:
      case -337606997:
      case 581647043:
      case -259354835:
        return "Rude";
      case -1413183150:
      case -83142732:
      case -1187192055:
      case 3522662:
        return "Me too";
    }
    return "That's not a " + name;
  }
  if (intVal < 0) return "Negative " + name + "s only exist on film";
  if (intVal < 1) return "How do you plan on getting less than 1 " + name + "?";
  return Math.round(func(intVal) * 100) / 100;
}

// return [error, result]
function convertResultToPair(result) {
  if (result === '') return ['', ''];
  if (typeof result == "number") return ['', result];
  if (result.indexOf("###") != -1) return result.split("###");
  return [result, ''];
}

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.props.onValueChange(e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.value;
      var errorMessage = this.props.error;
      return React.createElement(
        "div",
        { className: "input-field" },
        React.createElement(
          "label",
          { style: { display: 'block' }, htmlFor: this.props.name },
          this.props.name[0].toUpperCase() + this.props.name.substr(1, this.props.name.length) + "s"
        ),
        React.createElement("input", {
          type: "text", name: this.props.name,
          style: { width: 290 + name.length + 'px' },
          placeholder: "Enter a number of " + this.props.name + "s (" + this.props.name + "power)",
          value: value,
          onChange: this.handleChange
        }),
        errorMessage
      );
    }
  }]);

  return Input;
}(React.Component);

var DuckConverter = function (_React$Component2) {
  _inherits(DuckConverter, _React$Component2);

  function DuckConverter(props) {
    _classCallCheck(this, DuckConverter);

    var _this2 = _possibleConstructorReturn(this, (DuckConverter.__proto__ || Object.getPrototypeOf(DuckConverter)).call(this, props));

    _this2.state = {
      changed: 'duck',
      value: ''
    };
    _this2.handleDuckChange = _this2.handleDuckChange.bind(_this2);
    _this2.handleHorseChange = _this2.handleHorseChange.bind(_this2);
    return _this2;
  }

  _createClass(DuckConverter, [{
    key: "handleDuckChange",
    value: function handleDuckChange(value) {
      this.setState({
        changed: "duck",
        value: value
      });
    }
  }, {
    key: "handleHorseChange",
    value: function handleHorseChange(value) {
      this.setState({
        changed: "horse",
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var errorMessage = "";
      var duckpower = "";
      var horsepower = "";
      if (this.state.changed == "duck") {
        var duckpowerResult = convertToXPower("duck", this.state.value, function (f) {
          return f * dHp;
        }, ["🦆"]);
        duckpower = this.state.value;
        horsepower = convertResultToPair(duckpowerResult)[1];
        errorMessage = convertResultToPair(duckpowerResult)[0];
      } else if (this.state.changed == "horse") {
        var horsepowerResult = convertToXPower("horse", this.state.value, function (f) {
          return f * hDp;
        }, ["🐎", "🏇", "🐴"]);
        horsepower = this.state.value;
        duckpower = convertResultToPair(horsepowerResult)[1];
        errorMessage = convertResultToPair(horsepowerResult)[0];
      }
      return React.createElement(
        "div",
        { style: { display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' } },
        React.createElement(
          "div",
          { style: { padding: '20px 50px 30px 50px', background: 'rgba(255,255,255,0.95)' } },
          React.createElement(
            "h1",
            { style: { fontSize: '1.5em' } },
            "Duck/Horsepower Converter"
          ),
          React.createElement(Input, { name: "duck", value: duckpower, onValueChange: this.handleDuckChange }),
          React.createElement(Input, { name: "horse", value: horsepower, onValueChange: this.handleHorseChange }),
          React.createElement(
            "div",
            null,
            errorMessage ? React.createElement(
              "span",
              { style: { color: 'red' } },
              errorMessage
            ) : React.createElement(
              "span",
              null,
              "\xA0"
            )
          )
        )
      );
    }
  }]);

  return DuckConverter;
}(React.Component);

ReactDOM.render(React.createElement(DuckConverter, null), document.getElementById("root"));