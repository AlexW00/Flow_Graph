import "./style.css";
import IFrameComponent from "./ui/components/iFrame/IFrameComponent";
import WebappComponent from "./ui/components/webapp/WebappComponent";
import CompilerModel from "./utils/CompilerModel";
import { Event, LiveData } from "./utils/Observable";

const url = new URL(window.location.href),
	isIframe = url.searchParams.get("iframe") === "true";

const app: WebappComponent | IFrameComponent = isIframe
	? new IFrameComponent()
	: new WebappComponent();
document.body.appendChild(app.html());
CompilerModel.graph.notifyAll(new Event(LiveData.EVENT_DATA_CHANGED, {}));
