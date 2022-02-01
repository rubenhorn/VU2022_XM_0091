#! /usr/bin/bash
NAMESPACE=development

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s

# Run from corresponding pods
CMD_EGRESS_FE_BE="wget http://vu-sc-frontend:3001 -qO- -T 5"
CMD_EGRESS_DB="curl --connect-timeout 5 http://vu-sc-frontend:3001"
# Run from temporary test pod
CMD_INGRESS_DB="wget http://vu-sc-database:27017 -qO- -T 5"

echo Testing network policies...

NO_OUTPUT="2>/dev/null 1>/dev/null"
PODS=$($KUBECTL get pod -n $NAMESPACE | tail -n +2 | awk '{ print $1 }')
for POD in $PODS; do
    echo - "$POD (egress)"
    if [[ $POD == *"database"* ]]; then
        ($KUBECTL exec -it -n $NAMESPACE $POD -- sh -c "$CMD_EGRESS_DB $NO_OUTPUT") 2>/dev/null || \
        echo - "$POD (ingress)" && \
        ($KUBECTL run -n $NAMESPACE -it --rm --restart=Never --image alpine tester -- sh -c "$CMD_INGRESS_DB $NO_OUTPUT") 1>/dev/null 2>/dev/null
    else
        ($KUBECTL exec -it -n $NAMESPACE $POD -- sh -c "$CMD_EGRESS_FE_BE $NO_OUTPUT") 2>/dev/null
    fi
    if [[ $? -eq 0 ]]; then
        echo "   ^ Network policy error!"
        exit 1
    fi
done
echo -e "\n=================\nAll tests passed!\n================="
