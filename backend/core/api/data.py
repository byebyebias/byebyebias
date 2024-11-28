PROCESSING_TECHNIQUES = {
    'pre-processing': {
        'description': (
            'Pre-processing techniques are all about fixing biases in the data before you even train a model. '
            'Think of it as preparing a fair playing field by adjusting the data itself. For example, the Disparate Impact Remover tweaks feature values to make them less biased, '
            'while Reweighing assigns different weights to data points to ensure all groups are treated fairly. '
            'We can help you understand these methods and how they ensure fairness right from the start.'
        ),
        'algorithms': {
            'Disparate Impact Remover': (
                'The Disparate Impact Remover is a great choice when you suspect that some features in your dataset are unfairly correlated with sensitive attributes. '
                'This method adjusts feature values to make them less biased while preserving the overall order within groups. It’s particularly useful when you want '
                'to ensure fairness before training your model, without changing the labels. To use it, you’d run the Disparate Impact Remover on your dataset and then use the transformed data for training.'
            ),
            'Reweighing': (
                'Reweighing is ideal when you want to tackle bias by adjusting the importance of each example in your dataset. '
                'It assigns different weights to data points based on their group and label, ensuring that the model doesn’t favor one group over another. '
                'This method works best in situations where you want to preserve the dataset structure but ensure that underrepresented groups are treated fairly. '
                'To apply it, you’d calculate the weights using the Reweighing method and use them during model training to balance the dataset.'
            )
        }
    },
    'in-processing': {
        'description': (
            'In-processing techniques come into play while the model is being trained. '
            'These methods make fairness part of the learning process itself. For instance, the Prejudice Remover adds a fairness-aware penalty to the training objective, '
            'while Adversarial Debiasing trains a model to perform well while making it hard to guess sensitive attributes like race or gender from its predictions. '
            'We can walk you through how these approaches work and how they build fairness into the model during training.'
        ),
        'algorithms': {
            'Prejudice Remover': (
                'The Prejudice Remover is an effective option when you want fairness to be a core part of the model training process. '
                'This method incorporates a fairness penalty directly into the learning objective, essentially teaching the model to minimize bias as it learns. '
                'It’s best used when you’re training from scratch and have the flexibility to modify the training algorithm. '
                'To use it, you’d train your model using the Prejudice Remover, adjusting the fairness penalty parameter to control the trade-off between accuracy and fairness.'
            ),
            'Adversarial Debiasing': (
                'Adversarial Debiasing is a powerful technique for scenarios where you want your model to perform well but also hide sensitive attributes from influencing predictions. '
                'It works by training a model alongside an adversary that tries to predict the protected attributes. The main model learns to perform its task while fooling the adversary, '
                'ensuring that sensitive information is not encoded in its predictions. This method is best suited for complex use cases where fairness and accuracy both matter significantly. '
                'To implement it, you’d set up the adversarial framework during training, often using deep learning frameworks like TensorFlow or PyTorch.'
            )
        }
    },
    'post-processing': {
        'description': (
            'Post-processing techniques deal with fairness after the model is trained. '
            'They don’t change the data or the model itself but instead adjust the predictions to make them fairer. '
            'For example, Equalized Odds Postprocessing tweaks predictions to ensure equal opportunity for all groups, '
            'and Reject Option Classification (ROC) focuses on uncertain predictions to balance outcomes for privileged and unprivileged groups. '
            'We can help you understand these techniques and how they refine fairness after the fact.'
        ),
       'algorithms': {
            'Equalized Odds Postprocessing': (
                'Equalized Odds Postprocessing is the go-to method when you want to fix fairness issues after the model is trained. '
                'It tweaks the predictions to ensure that all groups, privileged or unprivileged, have similar chances of positive outcomes. '
                'This is especially useful if retraining the model isn’t an option and you need to adjust fairness quickly. To use it, you’d input the true and predicted labels into the method, '
                'and it will output adjusted predictions that meet equalized odds constraints.'
            ),
            'Reject Option Classification': (
                'Reject Option Classification (ROC) is perfect when your model struggles with predictions near the decision boundary. '
                'It focuses on the uncertain cases, favoring unprivileged groups when there’s ambiguity. This method is best for scenarios where you want to improve fairness without heavily modifying predictions far from the boundary. '
                'To apply it, you’d configure the ROC parameters like thresholds and margins, and then let the algorithm adjust the predictions in these high-uncertainty areas.'
            )
        }
    }
}