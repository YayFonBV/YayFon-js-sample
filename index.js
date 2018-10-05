
let connection= null;
let username;

function login() {
    let clientData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    connection = new YayFonFactory(clientData, reactionOnCall);
    document.getElementById('username').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('call').style.display = 'inline';
    document.getElementById('decline').style.display = 'inline';
    document.getElementById('answer').style.display = 'inline';
    document.getElementById('extension').style.display = 'inline';
}

function reactionOnCall(call, userName) {
    const isIncoming = call.isIncomingCall();
    if (isIncoming) {
        call.onEnd(() => {
            console.log('end');
        });
        call.onFail((e) => {
            console.log('onFail', e);
        });
        call.onProgress(() => {
            console.log('onProgress');
        });
    }

    if (!isIncoming) {
        call.onEnd(() => {
            console.log('end');
        });
        call.onFail((e) => {
            console.log('onFail', e);
        });
        call.onAnswer(() => {
            console.log('onAnswer');
            document.getElementById('blindTransfer').style.display = 'inline';
            document.getElementById('attendedTransfer').style.display = 'inline';
            document.getElementById('extension').style.display = 'inline';
        });
    }
}

function call(extension) {
    connection.call(extension, function (e) {
        let remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
    });
}

function answer() {
    connection.getAgentCall().answer(function (e) {
        let remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
    });
    document.getElementById('blindTransfer').style.display = 'inline';
    document.getElementById('attendedTransfer').style.display = 'inline';
}

function decline() {
    connection.end();
    document.getElementById('confirmTransfer').style.display = 'none';
    document.getElementById('blindTransfer').style.display = 'none';
    document.getElementById('attendedTransfer').style.display = 'none';
}

function blindTransfer(number) {
    console.log(connection.agentCall)
    connection.getAgentCall().blindTransfer(number);
}

function attendedTransfer(extension) {
    connection.attendedTransfer(connection.agentCall, extension, (e) => {
        let remoteAudio = document.getElementById('remoteAudio');
        remoteAudio.srcObject = e.stream;
        remoteAudio.play();
    });
    document.getElementById('confirmTransfer').style.display = 'inline';
}

function confirmTransfer() {
    connection.confirmTransfer();
}