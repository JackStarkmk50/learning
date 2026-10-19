Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """C:\ngrok\ngrok.exe"" http 3000", 0, False