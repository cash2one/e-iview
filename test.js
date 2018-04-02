function searchTypegroup(code) {
    var _typegroupArray = JSON.parse(localStorage.getItem('AllTSTypeGroups'))
    var _typegroupid
    var url

    for (var i = 0; i < _typegroupArray.length; i++) {
        if (_typegroupArray[i].typegroupcode == code) {
            _typegroupid = _typegroupArray[i].typegroupid
        }
    }

    url = (code == 'customerType') ? ('/api/dataCenter/system/queryForSubTSTypeByGroupId/' + _typegroupid) : ('/api/dataCenter/system/queryForTSTypeByGroupId/' + _typegroupid)

    this.$http.get(url)
        .then(function (response) {
            var str = JSON.stringify(response.data)
            localStorage.setItem(code,str)
        })
}