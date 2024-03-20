import json
import numpy as np

from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

def eval():
    with open("traces.json", "r") as f:
        # Load contents from file as JSON data
        data = json.loads(f.read())

    # Convert data to numpy arrays for easier handling
    X = np.array(data["traces"])
    y = np.array(data["labels"])

    # Initialize classifiers to evaluate
    classifiers = {
        "Random Forest": RandomForestClassifier(),
        "SVM": SVC(),
        "kNN": KNeighborsClassifier()
    }

    for name, clf in classifiers.items():
        print(f"Evaluating {name}...")
        y_pred_full, y_test_full = [], []

        # Re-train 10 times in order to reduce effects of randomness
        for i in range(10):
            # Split data into training and testing sets
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

            # Train classifier
            clf.fit(X_train, y_train)

            # Make predictions on the testing set
            y_pred = clf.predict(X_test)

            # Collect predictions and actual labels for overall evaluation
            y_test_full.extend(y_test)
            y_pred_full.extend(y_pred)

        # Print classification report for the current classifier
        print(classification_report(y_test_full, y_pred_full))

if __name__ == "__main__":
    eval()
