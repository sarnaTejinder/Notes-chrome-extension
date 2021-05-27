chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.local.set({
        "notes":[],
        "theme":"light"
    })
})

chrome.runtime.onMessage.addListener((request , sender ,sendResponse)=>{
    console.log(request)
    if(request.message === "get_notes"){
        chrome.storage.local.get('notes',data=>{
            // console.log(data.notes)
            if(chrome.runtime.lastError){
                sendResponse({
                    message:"fail"
                })
                return;
            }
            sendResponse({
                message:"success",
                payload:data.notes
            })
        })
        return true;
    }
    if(request.message === "set_notes"){
        // console.log('set')
        chrome.storage.local.set({
            "notes":request.payload 
        })
            if(chrome.runtime.lastError){
                sendResponse({
                    message:"fail"
                })
                return;
            }
            sendResponse({
                message:"success"
            })

            // chrome.storage.local.get("notes",data=>{
            //     console.log(data.notes)
            // }
            // )
        return true;
    }
    
})