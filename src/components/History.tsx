import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface HistoryProps {
    history: string []
  }

export default function History({ history }: HistoryProps) {

    return(
        <Dialog>
            <DialogTrigger asChild>
                <button className="ml-full mb-3 px-4 py-2 font-bold rounded-lg bg-blue-500 text-white">Histórico</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-mono text-gray-800">Histórico</DialogTitle>
                </DialogHeader>
                <div className="size-full bg-gray-800 rounded-lg text-white p-4">
                    {
                        history.length === 0
                        ?
                        <p className="text-2xl font-mono">Nenhum calculo feito!</p>
                        :
                        history.map((his, index) => 
                            <p className="text-2xl font-mono" key={`${his}-${index}`}>{his}</p>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}