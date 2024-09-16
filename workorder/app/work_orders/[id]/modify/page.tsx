import MultiStepForm from "@/mycomponents/multistepForm"

export default function WorKOrderModifyPage({params}:{params: {id: string}}){
    return(<div><p>Modify work order for ID: {params.id}</p>
    <MultiStepForm />
    </div>)
}