// AppLayout.tsx
import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";

type Props = {
    children: React.ReactNode;
}

export default class AppLayout extends Component<Props> {
    render() {
        return (
            <div className="min-h-screen bg-gray-50">
                <BarraNavegacao {...this.props} />
                
                <main className="container mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {this.props.children}
                    </div>
                </main>

                <footer className="bg-primary text-white py-4 mt-8">
                    <div className="container mx-auto px-4 text-center">
                        <p>© 2023 PetLovers - Todos os direitos reservados</p>
                    </div>
                </footer>
            </div>
        )
    }
}