import "./style.css";
import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar";
import Graph from "./graph/Graph";
import D3Graph from "./d3/D3Graph";
import D3_CONFIG from "./d3/D3_CONFIG";
import SettingsModel from "./utils/SettingsModel";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};

const url = new URL(window.location.href);
const urlSettings = url.searchParams.get("settings");
if (urlSettings) SettingsModel.init(urlSettings);
const isIframe = url.searchParams.get("iframe") === "true";

let inputString = url.searchParams.get("input") ?? D3_CONFIG.website.startInput;
const compiler = new TinyComp(attributeGrammar, compilerOptions);
let graph = compiler.compile(inputString) as Graph;

let d3graph = new D3Graph(graph, document);

const app = document.querySelector<HTMLDivElement>("#app")!;
const svg = document.querySelector<SVGSVGElement>("#svg")!;

const settingsButton =
    document.querySelector<HTMLButtonElement>("#settings_button")!,
  settingsContainer = document.querySelector<HTMLDivElement>(
    "#settings_container"
  )!;

function toggleSettings() {
  settingsContainer.classList.toggle("invisible");
}

settingsButton.addEventListener("click", () => toggleSettings());

const nodeColorPicker =
    document.querySelector<HTMLInputElement>("#node_color")!,
  linkColorPicker = document.querySelector<HTMLInputElement>("#link_color")!;

nodeColorPicker.value = SettingsModel.nodeColor.value;
linkColorPicker.value = SettingsModel.linkColor.value;

nodeColorPicker?.addEventListener("change", (e) => {
  const newColor = (e.target as HTMLInputElement).value;
  SettingsModel.nodeColor.value = newColor;
});
linkColorPicker?.addEventListener("change", (e) => {
  const newColor = (e.target as HTMLInputElement).value;
  SettingsModel.linkColor.value = newColor;
});

app.appendChild(svg);

const helpButton = document.querySelector<HTMLButtonElement>("#help_button")!;
helpButton.addEventListener("click", () => {
  window.open("https://github.com/" + D3_CONFIG.website.githubRepo);
});

const errorBox = document.querySelector<HTMLDivElement>("#error_box")!,
  errorMessage = document.querySelector<HTMLDivElement>("#error_message")!;

function toggleErrorBox(doShow: boolean, message: string | null) {
  if (message) errorMessage.innerText = message;
  errorBox.classList.toggle("hidden", !doShow);
}

function toggleBlueButton(
  doActivate: boolean,
  button: HTMLButtonElement | HTMLInputElement
) {
  const disabledButtonClasses = [
      "bg-gray-500",
      "hover:bg-gray-400",
      "border-gray-700",
      "hover:border-gray-500",
    ],
    enabledButtonClasses = [
      "bg-blue-500",
      "hover:bg-blue-400",
      "border-blue-700",
      "hover:border-blue-500",
    ];
  button.disabled = !doActivate;
  if (!doActivate) {
    button.classList.remove(...enabledButtonClasses);
    button.classList.add(...disabledButtonClasses);
  } else {
    button.classList.remove(...disabledButtonClasses);
    button.classList.add(...enabledButtonClasses);
  }
}

const input = document.querySelector<HTMLInputElement>("#input")!;
input.value = inputString;

input.addEventListener("input", (e) => {
  inputString = (e.target as HTMLInputElement).value;
  try {
    graph = compiler.compile(inputString) as Graph;
    toggleErrorBox(false, null);
    toggleBlueButton(true, renderButton);
    toggleBlueButton(true, shareButton);
  } catch (e: any) {
    toggleErrorBox(true, e.message);
    toggleBlueButton(false, renderButton);
    toggleBlueButton(false, shareButton);
  }
});

const renderButton =
  document.querySelector<HTMLInputElement>("#submit_button")!;
renderButton.addEventListener("click", () => {
  const newInput = (input as HTMLInputElement).value;
  try {
    graph = compiler.compile(newInput) as Graph;
  } catch (e: any) {
    toggleErrorBox(true, e.message);
    return;
  }
  toggleErrorBox(false, null);
  d3graph.delete();
  d3graph = new D3Graph(graph, document);
});

const shareButton = document.querySelector<HTMLInputElement>("#share_button")!,
  sharePopup = document.querySelector<HTMLDivElement>("#share_popup")!,
  sharePopupUrlInput =
    document.querySelector<HTMLInputElement>("#export_url_field")!,
  sharePopupIframeInput = document.querySelector<HTMLInputElement>(
    "#export_iframe_field"
  )!,
  sharePopupCopyUrlButton = document.querySelector<HTMLButtonElement>(
    "#export_url_copy_button"
  )!,
  sharePopupCopyIframeButton = document.querySelector<HTMLButtonElement>(
    "#export_iframe_copy_button"
  )!;

function closeSharePopup() {
  sharePopup.classList.add("invisible");
}

sharePopupCopyUrlButton.addEventListener("click", () => {
  console.log("copy");
  const url = sharePopupUrlInput.value;
  navigator.clipboard.writeText(url);
  closeSharePopup();
});

sharePopupCopyIframeButton.addEventListener("click", () => {
  console.log("copy");
  const url = sharePopupIframeInput.value;
  navigator.clipboard.writeText(url);
  closeSharePopup();
});

function positionSharePopup() {
  const { left, top } = shareButton.getBoundingClientRect(),
    shareButtonWidth = shareButton.offsetWidth,
    popupHeight = sharePopup.offsetHeight,
    popupWidth = sharePopup.offsetWidth;

  sharePopup.style.left = `${left - popupWidth / 2 + shareButtonWidth / 2}px`;
  sharePopup.style.top = `${top - popupHeight - 10}px`;
}

function setExportUrl() {
  const url = `${window.location.href}?input=${encodeURIComponent(
    inputString
  )}&settings=${encodeURIComponent(SettingsModel.exportString())}`;
  console.log(url);
  sharePopupUrlInput.value = url;
}

function setExportIframe() {
  console.log(SettingsModel.exportString());
  const url = `${window.location.href}?input=${encodeURIComponent(
    inputString
  )}&settings=${encodeURIComponent(SettingsModel.exportString())}&iframe=true`;
  sharePopupIframeInput.value = `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;
}

function setExportTexts() {
  setExportUrl();
  setExportIframe();
}

function toggleSharePopup() {
  positionSharePopup();
  const isInvisibile = sharePopup.classList.toggle("invisible");
  if (!isInvisibile) {
    setExportTexts();
  }
}

shareButton.addEventListener("click", () => toggleSharePopup());
