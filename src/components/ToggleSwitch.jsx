export default function ToggleSwitch({ txt, name }) {
  return (
    <label class="toggle">
      <input type="checkbox" className="toggle_checkbox" name={name}/>
      <div class="toggle_switch"></div>
      <span class="toggle_label">{txt}</span>
    </label>
  );
}
