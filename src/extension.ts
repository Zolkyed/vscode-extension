import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // 파일명과 함께 복사하는 동작 실행
  let copyWithFilenameInMenu = vscode.commands.registerCommand(
    "copy-with-filename.copy-with-filename",
    (uri: vscode.Uri) => {
      // 파일 경로 데이터가 있는지 확인함
      if (uri && uri.fsPath) {
        // 프로젝트 기준 파일의 상대경로를 들고옴
        const filename = vscode.workspace.asRelativePath(uri.fsPath);

        // 파일의 내용을 들고오기 위해 에디터를 이용함
        const editor = vscode.window.activeTextEditor;

        if (editor) {
          // 파일내용을 가져옴
          let documentText = editor.document.getText();

          if (documentText) {
            // 파일내용 최상단에 파일경로를 추가함
            const documentTextWithFilename = `//${filename} \n ${documentText}`;

            // 파일명이 포함된 파일내용 복사
            vscode.env.clipboard
              .writeText(documentTextWithFilename)
              .then(() => {
                vscode.window.showInformationMessage(
                  `Copied file name: ${filename}`
                );
              });
          }
        }
      } else {
        vscode.window.showInformationMessage("No file selected");
      }
    }
  );

  // copyWithFilenameInMenu 구독
  context.subscriptions.push(copyWithFilenameInMenu);
}
