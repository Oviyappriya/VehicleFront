import PropTypes from "prop-types";

export default function Perks({ selected = [], onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((selectedName) => selectedName !== name));
    }
  }

  return (
    <div>
      <div className="row" style={{ paddingLeft: "30px" }}>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="perk1"
            name="Free vehicle wash"
            checked={selected.includes("Free vehicle wash")}
            onChange={handleCbClick}
          />
          <label className="form-check-label" htmlFor="perk1">
            Free vehicle wash
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="perk2"
            name="Improved comfortable"
            checked={selected.includes("Improved comfortable")}
            onChange={handleCbClick}
          />
          <label className="form-check-label" htmlFor="perk2">
            Improved comfortable
          </label>
        </div>
      </div>
      <div className="row" style={{ paddingLeft: "30px" }}>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="perk3"
            name="Fuel Efficiency"
            checked={selected.includes("Fuel Efficiency")}
            onChange={handleCbClick}
          />
          <label className="form-check-label" htmlFor="perk3">
            Fuel Efficiency
          </label>
        </div>
        <div className="form-check col">
          <input
            className="form-check-input"
            type="checkbox"
            id="perk4"
            name="Your car lives longer"
            checked={selected.includes("Your car lives longer")}
            onChange={handleCbClick}
          />
          <label className="form-check-label" htmlFor="perk4">
            Your car lives longer
          </label>
        </div>
      </div>
    </div>
  );
}

Perks.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};