export default function ToggleSwitch({ txt }) {
  return (
    <label class="toggle">
      <input type="checkbox" className="toggle_checkbox" />
      <div class="toggle_switch"></div>
      <span class="toggle_label">{txt}</span>
    </label>
  );
}
