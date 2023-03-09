import type { IChangedTiddlers, IWidgetEvent } from 'tiddlywiki';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';

class SpeechSynthesisWidget extends Widget {
  // constructor(parseTreeNode: IParseTreeNode, options?: unknown) {
  //   super(parseTreeNode, options);
  // }

  refresh(changedTiddlers: IChangedTiddlers): boolean {
    if ($tw.utils.count(this.computeAttributes()) > 0) {
      this.refreshSelf();
      return true;
    }
    return this.refreshChildren(changedTiddlers);
  }

  /**
   * Lifecycle method: Render this widget into the DOM
   */
  render(parent: Element, nextSibling: Element | null): void {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    this.renderChildren(parent, nextSibling);
  }

  invokeAction(triggeringWidget: Widget, event: IWidgetEvent): boolean | undefined {
    const text = this.getAttribute('text');
    if (text) {
      this.speak(text);
    }
    return;
  }

  private speak(text: string): void {
    const msg = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    window.speechSynthesis.speak(msg);
  }
}

declare const exports: Record<string, typeof Widget>;
exports['speech-synthesis-widget'] = SpeechSynthesisWidget;
