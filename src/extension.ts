import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let copyWithFilename = vscode.commands.registerCommand(
    "copy-with-filename.copy-with-filename",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        let documentText = editor.document.getText(editor.selection);

        const filePath = vscode.workspace.asRelativePath(
          editor.document.uri.fsPath
        );

        const mark = getCommentMark(filePath, "{{__filename__}}");

        const documentTextWithFilename = `${mark.replace(
          "{{__filename__}}",
          filePath 
        )} \n${documentText}`;

        vscode.env.clipboard.writeText(documentTextWithFilename);
      }
    }
  );

  context.subscriptions.push(copyWithFilename);
}

const getCommentMark = (filePath: string, tempFilename: string) => {
  const fileType = filePath.split(".").pop();
  switch (fileType) {
    case "js":
    case "ts":
    case "java":
    case "jsx":
    case "tsx":
    case "c":
    case "cpp":
    case "cs":
    case "php":
      return `// ${tempFilename}`;
    case "jsp":
      return `<%-- ${tempFilename} --%>`;
    case "html":
    case "xml":
    case "md":
      return `<!-- ${tempFilename} -->`;
    case "css":
      return `/* ${tempFilename} */`;
    case "asp":
      return `' ${tempFilename}`;
    case "yml":
    case "yaml":
    case "sh":
    case "py":
      return `# ${tempFilename}`;
    default:
      return `// ${tempFilename}`;
  }
};
