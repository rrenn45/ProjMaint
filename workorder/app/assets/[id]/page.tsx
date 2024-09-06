export default function AssetDetailPage({params} : { params : {id : string}}){
    return (
        <div>
            <p> Asset ID = {params.id}</p>
        </div>
    )
}