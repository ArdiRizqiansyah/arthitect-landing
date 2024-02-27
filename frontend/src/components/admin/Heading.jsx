import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const heading = ({ title, icon, urlBack, children }) => {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-3">
                <Card className="shadow-none text-primary-app">
                    {icon}
                </Card>
                <div>
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
            </div>
            <div className="ml-auto">
                {children}
                {urlBack && (
                    <Link to={urlBack}>
                        <Button as="span" size="sm" color="warning">
                            Kembali
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default heading;