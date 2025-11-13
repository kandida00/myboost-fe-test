import { Button } from "@/components/atoms/Button/Button";
import styles from './ModalDelete.module.scss';

interface ModalDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ModalDelete({ onConfirm, onCancel }: ModalDeleteProps) {
    return (
        <div className={styles['delete-modal']}>
            <div className={styles['delete-modal__content']}>
                <h3 className={styles['delete-modal__title']}>
                    Confirm Delete
                </h3>
                <p className={styles['delete-modal__text']}>
                    Are you sure you want to delete this blog post? This action cannot be undone.
                </p>
                <div className={styles['delete-modal__actions']}>
                    <Button onClick={onCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} variant="danger">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}