function trimAlligators(searchText) {
    if (searchText.slice(0, 1) == '<' && searchText.slice(-1) == '>') {
        return searchText.slice(1, -1);
    } else
    { return searchText; }
};

chrome.omnibox.onInputEntered.addListener(
    function (text) {

        // if user enters a keyword after the omnibox keyword, redirect search to different destination
        var splitText = text.split(' ');
        var firstWord = splitText[0];
        var secondWord = splitText[1];

        switch (firstWord.toLowerCase()) {
            case 'sherlock':
                if (isNaN(secondWord)) {
                    var newURL = 'https://sherlock.epic.com/default.aspx?view=slg/search#txt=' + encodeURIComponent(trimAlligators(text.substring(9)));
                } else {
                    var newURL = 'https://sherlock.epic.com/default.aspx?view=slg/home#id=' + secondWord + '&view=1';
                }
                break;
            case 'nova':
                if (isNaN(secondWord)) {
                    var newURL = 'https://nova.epic.com/Search.aspx?#addPt1&SearchTerm=' + encodeURIComponent(trimAlligators(text.substring(5)));
                } else {
                    var newURL = 'https://nova.epic.com/Select.aspx?RnID=' + secondWord;
                }
                break;
            case 'topic':
                var newURL = 'https://userweb.epic.com/Search?Query=' + encodeURIComponent(trimAlligators(text.substring(6)));
                break;
            case 'galaxy':
                var newURL = 'https://galaxy.epic.com/?#Search/searchWord=' + encodeURIComponent(trimAlligators(text.substring(6)));
                break;
            case 'metric':
                var newURL = 'https://datahandbook.epic.com/Search/Index?SearchWord=' + encodeURIComponent(trimAlligators(text.substring(6))) + 'type=4';
                break;
            default:
                var newURL = 'https://galaxy.epic.com/?#Search/searchWord=' + encodeURIComponent(trimAlligators(text));
        }

        chrome.tabs.update({ url: newURL });
    });
