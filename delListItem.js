var clientContext;
var website;
var oList;
var cnt = 0;

function deleteAllItemsFromList() {
clientContext = SP.ClientContext.get_current();
website = clientContext.get_web();
oList = website.get_lists().getByTitle('Eventos');

var camlQuery = new SP.CamlQuery();
camlQuery.set_viewXml('<View><Query><Where><Leq><FieldRef Name=\'ID\'/>' + 
        '<Value Type=\'Number\'>394</Value></Leq></Where></Query></View>');
this.collListItem = oList.getItems(camlQuery);

clientContext.load(website);
clientContext.load(collListItem, 'Include(Id)');
clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded(sender, args) {
var listItemInfo = "";
var listItemEnumerator = collListItem.getEnumerator();
while (listItemEnumerator.moveNext()) {
var oListItem = listItemEnumerator.get_current();
var ID = oListItem.get_id();
var oListItemDel = oList.getItemById(ID);
oListItemDel.deleteObject();
clientContext.executeQueryAsync(Function.createDelegate(this, this.onDeleteSucceeded), Function.createDelegate(this, this.onDeleteFailed));
}
}

function onQueryFailed(sender, args) {
alert('Failed');
}

function onDeleteFailed(sender, args) {
alert('Failed');
}

function onDeleteSucceeded(sender, args) {
cnt = cnt + 1;
alert('Delete success : ' + cnt);
}