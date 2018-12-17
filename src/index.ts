import {
  JupyterLab, JupyterLabPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  IDocumentManager
} from '@jupyterlab/docmanager';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';

let unique = 0;

// https://github.com/timkpaine/jupyterlab_iframe
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_nf_doc',
  autoStart: true,
  requires: [IDocumentManager, ICommandPalette, ILayoutRestorer],
  activate: activate
};

class IFrameWidget extends Widget {
  constructor(path: string) {
    super();
    this.id = path + '-' + unique;
    unique += 1;

    this.title.label = "Nextflow Documentation";
    this.title.closable = true;

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    let iframe = document.createElement('iframe');
    iframe.setAttribute('baseURI', '');
    iframe.src = path;

    div.appendChild(iframe);
    this.node.appendChild(div);
  }
};

function activate(app: JupyterLab, docManager: IDocumentManager, palette: ICommandPalette, restorer: ILayoutRestorer) {

  // Declare a widget variable
  let widget: IFrameWidget;

  // Add an application command
  const open_command = 'iframe:open';

  app.commands.addCommand(open_command, {
    label: 'Nextflow Documentation2',
    isEnabled: () => true,
    execute: args => {
        var path='https://www.nextflow.io/docs/latest/index.html'
        widget = new IFrameWidget(path);
        app.shell.addToMainArea(widget);
        app.shell.activateById(widget.id);
    }
  });

  // Add the command to the palette.
  palette.addItem({command: open_command, category: 'Nextflow'});

  console.log('*** JupyterLab extension jupyterlab_nf_doc is activated!');
};

export default extension;
export {activate as _activate};